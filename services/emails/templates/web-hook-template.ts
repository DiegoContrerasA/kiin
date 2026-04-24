import { parseId } from "@/lib/id-serializer";
import { AutocorePaymentWebhook } from "@/types/autocore";

const webHookTemplate = (webhookData: AutocorePaymentWebhook) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error en el Procesamiento del Webhook</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 32px 16px;">
    <tr>
      <td align="center">

        <!-- Contenedor principal -->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 560px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">

          <!-- Header rojo -->
          <tr>
            <td style="background-color: #a32d2d; padding: 20px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="44" valign="middle">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background-color: rgba(255,255,255,0.15); text-align: center; line-height: 36px; font-size: 20px;">
                      &#x26A0;
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.7); font-family: Arial, Helvetica, sans-serif;">Notificación del sistema</p>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">Error en el Procesamiento del Webhook</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding: 24px;">

              <p style="margin: 0 0 20px; font-size: 14px; color: #555555; font-family: Arial, Helvetica, sans-serif;">
                Ocurrió un error al procesar el siguiente webhook:
              </p>

              <!-- Tabla de datos -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background-color: #f9f9f9; border-radius: 6px; border: 1px solid #e8e8e8; border-collapse: collapse;">

                <!-- Fila 1 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; width: 50%; border-bottom: 1px solid #e8e8e8;">
                    ID de Reserva PMS
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: 'Courier New', Courier, monospace; border-bottom: 1px solid #e8e8e8;">
                    ${parseId(webhookData?.external_ref_id, 'BK')}
                  </td>
                </tr>

                <!-- Fila 2 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    ID de Referencia Externo
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: 'Courier New', Courier, monospace; border-bottom: 1px solid #e8e8e8;">
                    ${webhookData?.external_ref_id}
                  </td>
                </tr>

                <!-- Fila 3 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Estado del Pago
                  </td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e8e8e8;">
                    <span style="display: inline-block; background-color: #fdecea; color: #a32d2d; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 4px; font-family: Arial, Helvetica, sans-serif;">
                      ${webhookData?.payment_status}
                    </span>
                  </td>
                </tr>

                <!-- Fila 4 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Monto
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-weight: bold; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${webhookData?.amount}
                  </td>
                </tr>

                <!-- Fila 5 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    ID de Transacción
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: 'Courier New', Courier, monospace; border-bottom: 1px solid #e8e8e8;">
                    ${webhookData?.transaction_id}
                  </td>
                </tr>

                <!-- Fila 6 -->
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">
                    Fecha del Pago
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif;">
                    ${webhookData?.payment_date}
                  </td>
                </tr>

              </table>

              <!-- Aviso -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 20px;">
                <tr>
                  <td style="border-left: 3px solid #ba7517; background-color: #fef9ee; padding: 10px 14px; border-radius: 0 4px 4px 0;">
                    <p style="margin: 0; font-size: 13px; color: #7a4f0d; font-family: Arial, Helvetica, sans-serif;">
                      Por favor revise los registros para obtener más detalles.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid #e8e8e8; padding: 12px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size: 11px; color: #aaaaaa; font-family: Arial, Helvetica, sans-serif;">
                    Mensaje automático — no responder
                  </td>
                  <td align="right" style="font-size: 11px; color: #aaaaaa; font-family: Arial, Helvetica, sans-serif;">
                    Sistema de Webhooks
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- Fin contenedor principal -->

      </td>
    </tr>
  </table>

</body>
</html>
            `;
};

export default webHookTemplate;