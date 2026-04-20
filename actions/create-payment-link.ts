'use server';

import CONFIG from '@/config';
import { generateAuthToken } from '@/lib/auth';
import { pool } from '@/lib/db';
import { getTotales } from '@/lib/mappers';
import { createReservation } from '@/lib/reservations';
import { UserSchemaValues } from '@/schemas/summary.schema';
import { getTRM } from '@/services/get-trm';
import { PaymentLinkResponseError, PaymentLinkResponseSuccess } from '@/types/payment-link';
import { Typology } from '@/types/room';
import logger from '@/lib/logger';

interface CreatePaymentLinkParams {
  room: Typology;
  user: UserSchemaValues & { countryCode: string };
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalAmount: number;
}


const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;


export async function createPaymentLink({
  room,
  user,
  checkIn,
  checkOut,
  adults,
  children,
  totalAmount,
}: CreatePaymentLinkParams): Promise<PaymentLinkResponseSuccess | PaymentLinkResponseError> {

  const externalRefId = generateId('KIIN');
  const reservationId = generateId('BK');

   const authToken = await generateAuthToken();
  const trm = await getTRM();
  const { depositTotal } = getTotales({
    airportPickup: user.airportPickup,
    petFee: user.petFee,
    totalPrice: totalAmount
  })

  const amountInCOP = Math.round(depositTotal * trm);

  const payload = {
    source: CONFIG.SOURCE,
    hotel_id: CONFIG.HOTEL_ID,
    guest_name: `${user.name} ${user.lastName}`.trim(),
    email: user.email,
    country_code: user.countryCode,
    phone: user.phone,
    amount: amountInCOP,
    currency: 'USD',
    booking_dates: `${checkIn} - ${checkOut}`,
    description: `Reserva de ${room.name}`,
    available_hours: 24,
    reservation_id: reservationId,
    external_ref_id: externalRefId,
    allowed_payment_options: ['credit_card'],
    temp_webhook_url: `${CONFIG.PUBLIC_URL}/api/webhook`,
    redirect: {
      success_url: `${CONFIG.PUBLIC_URL}/thank-you?confirmationNumber=${externalRefId}`,
      failure_url: `${CONFIG.PUBLIC_URL}/reservation-error?confirmationNumber=${externalRefId}`,
    },
  };

  let connection;

  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    await connection.execute(
      createReservation(),
      [
        reservationId,
        externalRefId,
        String(CONFIG.HOTEL_ID),
        amountInCOP,
        totalAmount,
        user.name,
        user.lastName,
        user.documentType,
        user.documentNumber,
        user.gender,
        user.email,
        `${user.countryCode} ${user.phone}`,
        user.nationality,
        user.country,
        user.socialMediaProfile || null,
        user.airportPickup || false,
        user.petFee || false,
        JSON.stringify(room),
        room._id,
        checkIn,
        checkOut,
        adults,
        children,
        user.airportPickup || false,
        user.petFee || false,
        user.socialMediaProfile || null,
      ]
    );

      logger.info('[CREATE_LINK] Sending request to payment API', {...payload});

    const response = await fetch(
      `${CONFIG.AUTO_CORE_BASE_URL}/links/schedule`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': authToken,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    );

    const data = await response.json();

    logger.info('[CREATE_LINK_RESPONSE] API response received', {...data});

    if (!response.ok || !data?.url) {
      await connection.rollback();
      logger.error('[PAYMENT_LINK_ERROR] Error creating payment link from API', { 
        status: response.status,
        response: data,
        externalRefId 
      });
      return {
        success: false,
        error: 'We have problems creating your payment link, please try again later',
        code: 'API_ERROR',
      };
    }

    await connection.commit();

    return {
      success: true,
      data: {
        url: data.url,
      },
    };

  } catch (error) {
      logger.error('[PAYMENT_LINK_ERROR] Error creating payment link', { 
        externalRefId,
        error: error instanceof Error ? error.message : String(error) 
      });

      if (connection) {
        try {
          await connection.rollback();
          logger.warn('[PAYMENT_LINK_ERROR] Transaction rolled back', { externalRefId });
        } catch (e) {
          logger.error('[PAYMENT_LINK_ERROR] Error rolling back transaction', { 
            externalRefId,
            error: e instanceof Error ? e.message : String(e) 
          });
        }
      }

    return {
      success: false,
      error: 'We have problems creating your payment link, please try again later',
      code: 'DB_CONNECTION_ERROR',
    };

  } finally {
    if (connection) {
      connection.release();
    }
  }
}