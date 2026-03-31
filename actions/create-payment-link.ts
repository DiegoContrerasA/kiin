'use server';

import CONFIG from '@/config';
import { UserSchemaValues } from '@/schemas/summary.schema';
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

interface PaymentLinkSuccess {
  success: true;
  data: {
    url: string;
  };
}

interface PaymentLinkError {
  success: false;
  error: string;
  code?: string;
}

type PaymentLinkResponse = PaymentLinkSuccess | PaymentLinkError;

/**
 * Helpers
 */

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
}: CreatePaymentLinkParams): Promise<PaymentLinkResponse> {
  // 🔒 Validaciones
  if (!user?.email) {
    return {
      success: false,
      error: 'User email is required',
      code: 'INVALID_EMAIL',
    };
  }

  if (!totalAmount || totalAmount <= 0) {
    return {
      success: false,
      error: 'Invalid total amount',
      code: 'INVALID_AMOUNT',
    };
  }

  if (!room?.name) {
    return {
      success: false,
      error: 'Room information is required',
      code: 'INVALID_ROOM',
    };
  }


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
    reservation_id: generateId('BK'),
    external_ref_id: generateId('KIIN'),
    allowed_payment_options: ['credit_card'],
    temp_webhook_url: `${CONFIG.PUBLIC_URL}/api/webhook`,
    redirect: {
      success_url: `${CONFIG.PUBLIC_URL}/thank-you`,
      failure_url: `${CONFIG.PUBLIC_URL}/failed`,
    },
  };

  try {
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
      return {
        success: false,
        error:
          data?.message ||
          `Payment link creation failed (${response.status})`,
        code: 'API_ERROR',
      };
    }

    if (!data?.id || !data?.url) {
      return {
        success: false,
        error: 'Invalid response from payment provider',
        code: 'INVALID_RESPONSE',
      };
    }

    return {
      success: true,
      data: {
        url: data.url,
      },
    };
  } catch (error) {
    console.error('[createPaymentLink]', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected error creating payment link',
      code: 'UNKNOWN_ERROR',
    };
  }
}