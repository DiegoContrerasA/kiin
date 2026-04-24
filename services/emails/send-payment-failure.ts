import logger from "@/lib/logger";
import { mailService } from "@/lib/mail";
import { PmsUser, PmsReservation, PmsTypology } from "@/types/pms";

export const sendPaymentFailure = async (
    user: PmsUser,
    reservation: PmsReservation,
    typology: PmsTypology
) => {
    try {
        await mailService.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Error en Creación de Reserva - Kiin Booking',
            html: `
                <h2>Error en la Creación de Reserva</h2>
                <p>Ocurrió un problema al crear la reserva para el siguiente usuario:</p>
                <ul>
                    <li><strong>Nombre:</strong> ${user?.name} ${user?.lastName}</li>
                    <li><strong>Correo:</strong> ${user?.email}</li>
                    <li><strong>Teléfono:</strong> ${user?.phone}</li>
                    <li><strong>Habitación:</strong> ${typology?.name}</li>
                    <li><strong>Fecha de Inicio:</strong> ${reservation?.dateStart}</li>
                    <li><strong>Fecha de Fin:</strong> ${reservation?.dateEnd}</li>
                    <li><strong>Adultos:</strong> ${reservation?.adults}</li>
                    <li><strong>Niños:</strong> ${reservation?.children}</li>
                    <li><strong>Con Mascota:</strong> ${reservation?.withPet ? 'Sí' : 'No'}</li>
                    <li><strong>Con Transfer:</strong> ${reservation?.withTransfer ? 'Sí' : 'No'}</li>
                </ul>
                <p><strong>Hubo problemas al crear la reserva. Por favor contactar al cliente para asistencia.</strong></p>
                <p>Por favor revise los registros para obtener más detalles.</p>
            `,
        });
    } catch (error) {
        logger.error('[EMAIL_ERROR] Error sending payment failure email', { 
            error: error instanceof Error ? error.message : String(error) 
        });
    }
}