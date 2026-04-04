'use server';

import CONFIG from '@/config';
import { PaymentRequest, PaymentResponse, PaymentApiResponse } from '@/types/payment';

export async function createPMSPayment(
  reservationId: string,
  amount: number,
  transactionId: string
): Promise<PaymentResponse> {
  const payload: PaymentRequest = {
    apiKey: CONFIG.PMS_KEY,
    booking: reservationId,
    authorization: transactionId,
    amount,
    currency: 'COP',
    trm: 0,
    type: 'pago',
    balanceType: 'host',
    paymentMethod: 'card',
    isForLodging: true,
  };

  const response = await fetch(`${CONFIG.PMS_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `PMS error (${response.status})`);
  }

  const data: PaymentApiResponse = await response.json();
  return data.payment;
}