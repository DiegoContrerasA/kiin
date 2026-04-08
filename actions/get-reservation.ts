'use server';

import { getReservationByExternalRef, ReservationRow } from '@/lib/reservations';
import { getLatestPosts, WPPost } from '@/services/get-latest-posts';
import { Typology } from '@/types/room';
import { redirect } from 'next/navigation';



interface ParsedReservation extends Omit<ReservationRow, 'typology'> {
  typology: Typology | null;
}

interface ThankYouData {
  reservation: ParsedReservation | null;
  posts: WPPost[];
}

export async function getThankYouData(confirmationNumber: string): Promise<ThankYouData> {
  if(!confirmationNumber) {
    redirect('/');
  }
  const [reservation, posts] = await Promise.all([
    getReservationByExternalRef(confirmationNumber),
    getLatestPosts(2),
  ]);

  let parsedReservation: ParsedReservation | null = null;

  if (reservation) {
    const { typology, ...reservationWithoutTypology } = reservation;
    parsedReservation = { ...reservationWithoutTypology, typology: null };
    
    if (typology) {
      try {
        parsedReservation.typology = JSON.parse(typology);
      } catch (error) {
        console.error('Error parsing typology:', error);
        parsedReservation.typology = null;
      }
    }
  }

  if(!reservation) {
    redirect('/');
  }

  return { reservation: parsedReservation, posts };
}