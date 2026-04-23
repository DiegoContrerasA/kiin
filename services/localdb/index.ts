import { query } from "@/lib/db";
import { ReservationRow, CreateReservationParams, PaymentStatus } from "@/types/localdb";
import { ResultSetHeader } from "mysql2";
import { logError } from "@/lib/logger";

export async function createLocalReservation(params: CreateReservationParams): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO reservations (
        external_ref_id, reservation_id, start_date, end_date, deposit, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await query<ResultSetHeader>(sql, [
      params.external_ref_id,
      params.reservation_id || '',
      params.start_date || '',
      params.end_date || '',
      params.deposit || 0,
      PaymentStatus.IN_PROCESS,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    logError('Error creating local reservation', error, { externalRefId: params.external_ref_id });
    return false;
  }
}

export async function getLocalReservationByExternalRef(externalRefId: string): Promise<ReservationRow | null> {
  try {
    const sql = 'SELECT * FROM reservations WHERE external_ref_id = ?';
    const rows = await query<ReservationRow[]>(sql, [externalRefId]);
    return rows[0] || null;
  } catch (error) {
    logError(`Error getting local reservation by external_ref_id: ${externalRefId}`, error);
    throw error;
  }
}


export async function updateLocalPaymentStatusByExternalRef(
  externalRefId: string,
  paymentStatus: PaymentStatus
): Promise<boolean> {
  try {
    const sql = 'UPDATE reservations SET payment_status = ? WHERE external_ref_id = ?';
    const result = await query<ResultSetHeader>(sql, [paymentStatus, externalRefId]);
    return result.affectedRows > 0;
  } catch (error) {
    logError(`Error updating local payment status for external_ref_id: ${externalRefId}`, error, { paymentStatus });
    throw error;
  }
}