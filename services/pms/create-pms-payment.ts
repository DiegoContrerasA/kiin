'use server';

import CONFIG from '@/config';

import { logError } from '@/lib/logger';
import { PmsPaymentRequest, PmsPaymentResponse } from '@/types/pms';

export async function createPMSPayment(
  reservationId: string,
  amount: number,
  transactionId: string
): Promise<PmsPaymentResponse | null> {
  try {
    const payload: PmsPaymentRequest = {
      apiKey: CONFIG.PMS_KEY,
      booking: reservationId,
      authorization: transactionId,
      amount,
      currency: 'USD',
      trm: 0,
      type: 'pago',
      balanceType: 'host',
      paymentMethod: 'card',
      isForLodging: true,
    };

    const response = await fetch(`${CONFIG.PMS_BASE_URL}/reservation/reservation/pay`, {
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

    const data: PmsPaymentResponse = await response.json();
    return data;
  } catch (error) {
    logError('[PMS] Error creating PMS payment', error, { reservationId, amount, transactionId });
    return null;
  }
}