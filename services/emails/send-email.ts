import logger from "@/lib/logger";
import { mailService } from "@/lib/mail";

export const sendEmail = async ({
    to = 'diegocontreras1219@gmail.com',
    template = '',
    subject = ''
}) => {
    try {
        await mailService.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            html: template
        });
    } catch (error) {
        logger.error(`[EMAIL_ERROR] Error sending ${to} error email`, {
            error: error instanceof Error ? error.message : String(error)
        });
    }
}