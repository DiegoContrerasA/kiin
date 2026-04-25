import { NextRequest, NextResponse } from 'next/server';


import { createPMSPayment } from '@/services/pms/create-pms-payment';

import { parseId } from '@/lib/id-serializer';
import logger from '@/lib/logger';
import { AutocorePaymentWebhook } from '@/types/autocore';
import { getLocalReservationByExternalRef, updateLocalPaymentStatusByExternalRef } from '@/services/localdb';
import { PaymentStatus } from '@/types/localdb';
import { sendEmail } from '@/services/emails/send-email';
import webHookTemplate from '@/services/emails/templates/web-hook-template';

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

    const reservationId = parseId(external_ref_id, 'BK');

    if (payment_status === PaymentStatus.APPLIED && reservationId && transaction_id) {
      createPMSPayment(reservationId, amount, transaction_id);
    }

    if (payment_status === PaymentStatus.REJECTED || payment_status === PaymentStatus.INVALID_CARD) {
      sendEmail({
        template: webHookTemplate(body),
        subject: 'Error de Webhook - Kiin Booking',
      });
    }

    await updateLocalPaymentStatusByExternalRef(external_ref_id, payment_status);

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    if (body) {
      sendEmail({
        template: webHookTemplate(body),
        subject: 'Error de Webhook - Kiin Booking',
      });
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