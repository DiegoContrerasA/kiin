import { PmsUser, PmsReservation, PmsTypology } from "@/types/pms";

const paymentFailureTemplate = (
    user: PmsUser,
    reservation: PmsReservation,
    typology: PmsTypology
) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error en Creación de Reserva</title>
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
                      &#x274C;
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 12px;">
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.7); font-family: Arial, Helvetica, sans-serif;">Notificación del sistema</p>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">Error en Creación de Reserva</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding: 24px;">

              <p style="margin: 0 0 20px; font-size: 14px; color: #555555; font-family: Arial, Helvetica, sans-serif;">
                Ocurrió un problema al crear la reserva para el siguiente usuario:
              </p>

              <!-- Tabla de datos -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                style="background-color: #f9f9f9; border-radius: 6px; border: 1px solid #e8e8e8; border-collapse: collapse;">

                <!-- Datos del cliente -->
                <tr>
                  <td colspan="2" style="padding: 12px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; background-color: #f0f0f0; border-bottom: 1px solid #e8e8e8;">
                    DATOS DEL CLIENTE
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; width: 50%; border-bottom: 1px solid #e8e8e8;">
                    Nombre
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${user?.name} ${user?.lastName}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Correo
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${user?.email}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Teléfono
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${user?.phone}
                  </td>
                </tr>

                <!-- Datos de la reserva -->
                <tr>
                  <td colspan="2" style="padding: 12px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; background-color: #f0f0f0; border-bottom: 1px solid #e8e8e8;">
                    DATOS DE LA RESERVA
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Habitación
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${typology?.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Fecha de Inicio
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${reservation?.dateStart}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Fecha de Fin
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${reservation?.dateEnd}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Adultos
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${reservation?.adults}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Niños
                  </td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #333333; font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #e8e8e8;">
                    ${reservation?.children}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold; border-bottom: 1px solid #e8e8e8;">
                    Con Mascota
                  </td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e8e8e8;">
                    <span style="display: inline-block; background-color: ${reservation?.withPet ? '#e8f5e8' : '#ffeaea'}; color: ${reservation?.withPet ? '#2d7a2d' : '#a32d2d'}; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 4px; font-family: Arial, Helvetica, sans-serif;">
                      ${reservation?.withPet ? 'Sí' : 'No'}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #888888; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">
                    Con Transfer
                  </td>
                  <td style="padding: 10px 16px;">
                    <span style="display: inline-block; background-color: ${reservation?.withTransfer ? '#e8f5e8' : '#ffeaea'}; color: ${reservation?.withTransfer ? '#2d7a2d' : '#a32d2d'}; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 4px; font-family: Arial, Helvetica, sans-serif;">
                      ${reservation?.withTransfer ? 'Sí' : 'No'}
                    </span>
                  </td>
                </tr>

              </table>

              <!-- Alerta importante -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 20px;">
                <tr>
                  <td style="border-left: 3px solid #a32d2d; background-color: #fdecea; padding: 14px; border-radius: 0 4px 4px 0;">
                    <p style="margin: 0; font-size: 14px; color: #7a2d2d; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">
                      Hubo problemas al crear la reserva. Por favor contactar al cliente para asistencia.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Aviso -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 16px;">
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
                    Sistema de Reservas
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

export default paymentFailureTemplate;
