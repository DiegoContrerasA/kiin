import { parseId } from "@/lib/id-serializer";
import logger from "@/lib/logger";
import { mailService } from "@/lib/mail";
import { AutocorePaymentWebhook } from "@/types/autocore";

export const sendWebHookError = async (webhookData: AutocorePaymentWebhook) => {
    try {
        await mailService.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Error de Webhook - Kiin Booking',
            html: `
                <h2>Error en el Procesamiento del Webhook</h2>
                <p>Ocurrió un error al procesar el siguiente webhook:</p>
                <ul>
                <li><strong>ID de Reserva PMS:</strong> ${parseId(webhookData.external_ref_id, '#')}</li>
                    <li><strong>ID de Referencia Externo:</strong> ${webhookData.external_ref_id}</li>
                    <li><strong>Estado del Pago:</strong> ${webhookData.payment_status}</li>
                    <li><strong>Monto:</strong> ${webhookData.amount}</li>
                    <li><strong>ID de Transacción:</strong> ${webhookData.transaction_id}</li>
                    <li><strong>Fecha del Pago:</strong> ${webhookData.payment_date}</li>
                </ul>
                <p>Por favor revise los registros para obtener más detalles.</p>
            `,
        });
    } catch (error) {
        logger.error('[EMAIL_ERROR] Error sending webhook error email', { 
            error: error instanceof Error ? error.message : String(error) 
        });
    }
}