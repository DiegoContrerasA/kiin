'use server';

import CONFIG from '@/config';
import { pool } from '@/lib/db';
import { createReservation } from '@/lib/reservations';
import { UserSchemaValues } from '@/schemas/summary.schema';
import { PaymentLinkResponseError, PaymentLinkResponseSuccess } from '@/types/payment-link';
import { Typology } from '@/types/room';


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

  const payload = {
    source: CONFIG.SOURCE,
    hotel_id: CONFIG.HOTEL_ID,
    guest_name: `${user.name} ${user.lastName}`.trim(),
    email: user.email,
    country_code: user.countryCode,
    phone: user.phone,
    amount: totalAmount,
    booking_dates: `${checkIn} - ${checkOut}`,
    description: `Reserva de ${room.name}`,
    available_hours: 24,
    reservation_id: reservationId,
    external_ref_id: externalRefId,
    allowed_payment_options: ['credit_card'],
    temp_webhook_url: `${CONFIG.PUBLIC_URL}/api/webhook`,
    redirect: {
      success_url: `${CONFIG.PUBLIC_URL}/thank-you`,
      failure_url: `${CONFIG.PUBLIC_URL}/failed`,
    },
  };

  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    await connection.execute(
      createReservation(),
      [
        reservationId,
        externalRefId,
        String(CONFIG.HOTEL_ID),
        user.name,
        user.lastName,
        user.documentType,
        user.documentNumber,
        user.gender,
        user.email,
        user.phone,
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

    const response = await fetch(
      `${CONFIG.AUTO_CORE_BASE_URL}/links/schedule`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      await connection.rollback();
      return {
        success: false,
        error:
          data?.message ||
          `Payment link creation failed (${response.status})`,
        code: 'API_ERROR',
      };
    }

    if (!data?.id || !data?.url) {
      await connection.rollback();
      return {
        success: false,
        error: 'Invalid response from payment provider',
        code: 'INVALID_RESPONSE',
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
    console.error('[createPaymentLink]', error);
    await connection.rollback();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected error creating payment link',
      code: 'UNKNOWN_ERROR',
    };
  } finally {
    connection.release();
  }
}