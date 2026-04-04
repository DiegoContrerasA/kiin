'use server';

import CONFIG from '@/config';
import { getReservationByExternalRef } from '@/lib/reservations';
import { ReservationRequest, ReservationApiResponse, ReservationResponse } from '@/types/reservation';

export async function createPMSReservation(externalRefId: string): Promise<ReservationResponse> {
  const reservation = await getReservationByExternalRef(externalRefId);

  if (!reservation) {
    throw new Error('Reservation not found');
  }

  const typology = reservation.typology ? JSON.parse(reservation.typology) : null;

  const payload: ReservationRequest = {
    user: {
      name: reservation.user_name || '',
      lastName: reservation.user_last_name || '',
      email: reservation.email,
      documentID: reservation.document_number || '',
      documentType: reservation.document_type || '',
      phone: reservation.phone || '',
      country: reservation.country || '',
      nationality: reservation.nationality || '',
      gender: reservation.gender || '',
      extraData: {
        socialMediaProfile: reservation.social_media_profile || undefined,
      },
    },
    reservation: {
      typology: typology._id ?? '',
      dateStart: reservation.reservation_date_start ? String(reservation.reservation_date_start) : '',
      dateEnd: reservation.reservation_date_end ? String(reservation.reservation_date_end) : '',
      adults: reservation.reservation_adults,
      children: reservation.reservation_children,
      withPet: reservation.reservation_with_pet,
      withTransfer: reservation.reservation_with_transfer,
      specialRequest: reservation.reservation_special_request || undefined,
    },
    isTest: process.env.NODE_ENV === 'development',
  };

  const response = await fetch(`${CONFIG.PMS_BASE_URL}/reservations`, {
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

  const data: ReservationApiResponse = await response.json();
  if(!data?.reservation?._id) {
    throw new Error('Reservation not created');
  }
  return data.reservation;
}