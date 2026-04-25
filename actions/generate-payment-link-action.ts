'use server';

import { logError } from '@/lib/logger';
import { PmsUser, PmsReservation, PmsTypology } from '@/types/pms';
import { createLocalReservation } from '@/services/localdb';
import { createAutocorePaymentLink } from '@/services/autocore';
import { autocoreAdapter } from '@/adapters/autocore.adapter';
import { generateId } from '@/lib/id-serializer';
import { calculateTotals } from '@/lib/mappers';
import { sendEmail } from '@/services/emails/send-email';
import paymentFailureTemplate from '@/services/emails/templates/payment-failure-template';
import { createPMSReservation } from '@/services/pms/create-pms-reservation';

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

    const pmsReservation = await createPMSReservation({
      user: user,
      reservation: reservation,
      isTest: true,
    });

    const reservation_id = 'test'

    const external_ref_id = generateId('BK', reservation_id);

       const { deposit } = calculateTotals({
            withTransfer: reservation.withTransfer,
            withPet: reservation.withPet,
            roomPrice: typology?.roomPrice || 0
        })
    
     await createLocalReservation({
      external_ref_id: external_ref_id,
      reservation_id: reservation_id,
      start_date: reservation.dateStart,
      end_date: reservation.dateEnd,
      payment_status: null,
      deposit,
      room_name: typology?.name || '',
      transaction_id: '',
      nights: typology?.nights || 0,
      full_name: `${user.name} ${user.lastName}`,
      email: user.email,
      phone: user.phone || ''
    });

    const paymentLink = await createAutocorePaymentLink(autocoreAdapter({ user, reservation, typology, external_ref_id, reservation_id , deposit }));

    return {
      success: true,
      link: paymentLink,
    };
  } catch (error) {
    sendEmail({
      template: paymentFailureTemplate(user, reservation, typology),
      subject: 'Error en Creación de Reserva - Kiin Booking',
    });
    logError('Error in generate payment link process', error, { user, typology, reservation });
    //aqui enviar email ....
    return {
      success: false,
      error: 'An unexpected error occurred while generating payment link',
    };
  }
}