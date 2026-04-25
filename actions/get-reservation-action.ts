'use server';

import { getLocalReservationByExternalRef } from '@/services/localdb';
import { getLatestPosts } from '@/services/pms/get-pms-latest-posts';
import { WPPost } from '@/types/pms';
import { redirect } from 'next/navigation';
import { PaymentStatus } from '@/types/localdb';

interface GetReservationData {
  start_date: string;
  end_date: string;
  status: PaymentStatus;
  deposit: number;
  posts: WPPost[];
  reservationId: string;
  fullName: string;
  nights: number;
  roomName: string;
}

export async function getReservationAction(
  externalRefId: string
): Promise<GetReservationData> {

  if(!externalRefId) {
    redirect('/not-found');
  }

  console.log('externalRefId', externalRefId);
  const [localReservation, posts] = await Promise.all([
    getLocalReservationByExternalRef(externalRefId),
    getLatestPosts(2),
  ]);

  if (!localReservation) {
    redirect('/not-found');
  }

  return {
    start_date: localReservation?.start_date || '',
    end_date: localReservation?.end_date || '',
    deposit: localReservation?.deposit || 0,
    status: (localReservation?.payment_status as PaymentStatus) || PaymentStatus.IN_PROCESS,
    posts: posts || [],
    reservationId: localReservation?.reservation_id || '',
    fullName: localReservation.full_name || '',
    nights: localReservation.nights || 0,
    roomName: localReservation.room_name || '',

  };
}