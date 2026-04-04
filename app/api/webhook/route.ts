import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhook } from '@/types/webhook';
import { createPMSReservation } from '@/services/create-pms-reservation';
import { createPMSPayment } from '@/services/create-pms-payment';
import { getReservationByExternalRef, updatePaymentByExternalRef } from '@/lib/reservations';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentWebhook = await request.json();
    
    console.log('Webhook received:', body);
    
    const { external_ref_id, amount, payment_status, transaction_id } = body;
    
    console.log('[Webhook] Processing payment for external_ref_id:', external_ref_id);
    
    const reservation = await getReservationByExternalRef(external_ref_id);
    
    if (!reservation) {
      console.error('[Webhook] Reservation not found for external_ref_id:', external_ref_id);
      return NextResponse.json(
        { success: false, message: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    console.log('[Webhook] Reservation found:', reservation.reservation_id);
    
    // Update payment data in our DB
    const paymentData = {
      transaction_id,
      amount,
      payment_status,
      webhook_data: body,
    };
    
    await updatePaymentByExternalRef(external_ref_id, paymentData);
    console.log('[Webhook] Payment data updated in DB');
    
    // Create reservation in PMS - always call to get the real booking ID from PMS
    let reservationId: string | undefined;
    
    try {
      const pmsReservation = await createPMSReservation(external_ref_id);
      reservationId = pmsReservation._id;
      console.log('[Webhook] PMS reservation created:', reservationId);
    } catch (error) {
      console.error('[Webhook] Error creating PMS reservation:', error);
    }
    
    // Create payment in PMS
    if (reservationId && transaction_id) {
      try {
        const pmsPayment = await createPMSPayment(reservationId, amount, transaction_id);
        console.log('[Webhook] PMS payment created:', pmsPayment._id);
      } catch (error) {
        console.error('[Webhook] Error creating PMS payment:', error);
      }
    }
    
    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { success: false, message: 'Error processing webhook' },
      { status: 500 }
    );
  }
}