'use server';

import CONFIG from '@/config';
import { PmsReservationRequest, PmsReservationApiResponse, PmsReservationResponse } from '@/types/pms';
import { logError } from '@/lib/logger';

export async function createPMSReservation(payload: PmsReservationRequest): Promise<PmsReservationResponse> {
  try {
    const response = await fetch(`${CONFIG.PMS_BASE_URL}/clients/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.PMS_KEY}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || `PMS error (${response.status})`);
    }

    const data: PmsReservationApiResponse = await response.json();
    if(!data?.reservation?._id) {
      throw new Error('Reservation not created');
    }
    return data.reservation;
  } catch (error) {
    logError('[PMS] Error creating PMS reservation', error, { payload });
    throw error;
  }
}