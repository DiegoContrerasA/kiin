import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhook } from '@/types/webhook';
import { createPMSReservation } from '@/services/create-pms-reservation';
import { createPMSPayment } from '@/services/create-pms-payment';
import { getReservationByExternalRef, updatePaymentByExternalRef } from '@/lib/reservations';
import logger from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body: PaymentWebhook = await request.json();
    
    const { external_ref_id, amount, payment_status, transaction_id } = body;
    
    logger.info('[WEBHOOK] Payment webhook received', { 
      externalRefId: external_ref_id, 
      amount, 
      paymentStatus: payment_status,
      transactionId: transaction_id 
    });
    
    const reservation = await getReservationByExternalRef(external_ref_id);
    
    if (!reservation) {
      logger.error('[WEBHOOK_ERROR] Reservation not found in database', { externalRefId: external_ref_id });
      return NextResponse.json(
        { success: false, message: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    logger.info('[WEBHOOK] Reservation found in database', { 
      externalRefId: external_ref_id,
      reservationId: reservation.reservation_id,
      email: reservation.email 
    });
    
    // Update payment data in our DB
    const paymentData = {
      transaction_id,
      amount,
      payment_status,
      webhook_data: body,
    };
    
    await updatePaymentByExternalRef(external_ref_id, paymentData);
    logger.info('[WEBHOOK] Payment data updated in database', { externalRefId: external_ref_id });
    
    // Create reservation in PMS - always call to get the real booking ID from PMS
    let reservationId: string | undefined;
    
    try {
      const pmsReservation = await createPMSReservation(external_ref_id);
      reservationId = pmsReservation._id;
      logger.info('[PMS] PMS reservation created', { 
        externalRefId: external_ref_id,
        pmsReservationId: reservationId 
      });
    } catch (error) {
      logger.error('[PMS_ERROR] Error creating PMS reservation', { 
        externalRefId: external_ref_id,
        error: error instanceof Error ? error.message : String(error) 
      });
    }
    
    // Create payment in PMS
    if (reservationId && transaction_id) {
      try {
        const pmsPayment = await createPMSPayment(reservationId, amount, transaction_id);
        logger.info('[PMS] PMS payment created', { 
          pmsReservationId: reservationId,
          pmsPaymentId: pmsPayment._id,
          amount 
        });
      } catch (error) {
        logger.error('[PMS_ERROR] Error creating PMS payment', { 
          pmsReservationId: reservationId,
          error: error instanceof Error ? error.message : String(error) 
        });
      }
    }
    
    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    logger.error('[WEBHOOK_ERROR] Error processing webhook', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return NextResponse.json(
      { success: false, message: 'Error processing webhook' },
      { status: 500 }
    );
  }
}