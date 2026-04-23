'use server';

import { logError } from '@/lib/logger';
import { PmsUser, PmsReservation, PmsTypology } from '@/types/pms';
import { createLocalReservation } from '@/services/localdb';
//import { createPMSReservation } from '@/services/pms/create-pms-reservation';
import { createAutocorePaymentLink } from '@/services/autocore';
import { autocoreAdapter } from '@/adapters/autocore.adapter';
import { generateId } from '@/lib/id-serializer';
import { calculateTotals } from '@/lib/mappers';

interface GeneratePaymentLinkParams {
  user: PmsUser;
  reservation: PmsReservation;
  typology: PmsTypology;
}

interface GeneratePaymentLinkResponse {
  success: true;
  link: string;
}

interface GeneratePaymentLinkError {
  success: false;
  error: string;
}

export async function generatePaymentLink(
  {user, reservation, typology}: GeneratePaymentLinkParams
): Promise<GeneratePaymentLinkResponse | GeneratePaymentLinkError> {
  try {

    // const pmsReservation = await createPMSReservation({
    //   user: user,
    //   reservation: reservation,
    //   isTest: process.env.NODE_ENV === 'development',
    // });

    // if (!pmsReservation) {
    //   return {
    //     success: false,
    //     error: 'Failed to create reservation, please try again',
    //   };
    // }

    const pmsReservation = {
      _id: 'test',
    }

    const external_ref_id = generateId('#', pmsReservation._id);
    const reservation_id = generateId('BK', pmsReservation._id);

       const { deposit } = calculateTotals({
            withTransfer: reservation.withTransfer,
            withPet: reservation.withPet,
            roomPrice: typology?.roomPrice || 0
        })
    

    const localReservation = await createLocalReservation({
      external_ref_id: external_ref_id,
      reservation_id: reservation_id,
      start_date: reservation.dateStart,
      end_date: reservation.dateEnd,
      payment_status: null,
      deposit 

    });
    if (!localReservation) {
      return {
        success: false,
        error: 'Failed to generate reservation, please try again',
      };
    }

    const paymentLink = await createAutocorePaymentLink(autocoreAdapter({ user, reservation, typology, external_ref_id, reservation_id }));
    if (!paymentLink) {
      return {
        success: false,
        error: 'Failed to generate payment link, please try again',
      };
    }

    return {
      success: true,
      link: paymentLink,
    };
  } catch (error) {
    logError('Error in generate payment link process', error, { user, typology, reservation });
    return {
      success: false,
      error: 'An unexpected error occurred while generating payment link',
    };
  }
}