import { NextRequest, NextResponse } from 'next/server';


import { createPMSPayment } from '@/services/pms/create-pms-payment';

import { parseId } from '@/lib/id-serializer';
import logger from '@/lib/logger';
import { AutocorePaymentWebhook } from '@/types/autocore';
import { getLocalReservationByExternalRef, updateLocalPaymentStatusByExternalRef } from '@/services/localdb';
import { PaymentStatus } from '@/types/localdb';
import { sendWebHookError } from '@/services/emails/send-webhook-error';

export async function POST(request: NextRequest) {
  let body: AutocorePaymentWebhook | null = null;
  
  try {
    body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { external_ref_id, amount, payment_status, transaction_id } = body;

    logger.info('[WEBHOOK] Payment webhook received', body);
    
    await getLocalReservationByExternalRef(external_ref_id);
    

    // Create reservation in PMS - always call to get the real booking ID from PMS
    const reservationId = parseId(external_ref_id, '#');

    
    // Create payment in PMS only when payment status is 'Aplicado'
    if (payment_status === PaymentStatus.APPLIED && reservationId && transaction_id) {
      createPMSPayment(reservationId, amount, transaction_id);
    }

    if(payment_status === PaymentStatus.REJECTED || payment_status === PaymentStatus.INVALID_CARD) {
    //aqui se debe enviar un email a juan felite 
    }

    await updateLocalPaymentStatusByExternalRef(external_ref_id, payment_status);
  
    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    if (body) {
      sendWebHookError(body);
    }
    logger.error('[WEBHOOK_ERROR] Error processing webhook', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return NextResponse.json(
      { success: false, message: 'Error processing webhook' },
      { status: 500 }
    );
  }
}