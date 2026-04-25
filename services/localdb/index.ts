import { query } from "@/lib/db";
import { ReservationRow, CreateReservationParams, PaymentStatus } from "@/types/localdb";
import { ResultSetHeader } from "mysql2";
import { logError } from "@/lib/logger";

export async function createLocalReservation(params: CreateReservationParams): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO reservations (
        external_ref_id, reservation_id, start_date, end_date, deposit, payment_status,
        room_name, transaction_id, nights, full_name, email, phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query<ResultSetHeader>(sql, [
      params.external_ref_id,
      params.reservation_id || '',
      params.start_date || '',
      params.end_date || '',
      params.deposit || 0,
      PaymentStatus.IN_PROCESS,
      params.room_name || '',
      params.transaction_id || '',
      params.nights || 0,
      params.full_name || '',
      params.email || '',
      params.phone || '',
    ]);
    return Boolean(result?.affectedRows);
  } catch (error) {
    logError('[LOCAL] Error creating local reservation', error, { externalRefId: params.external_ref_id });
    throw error; 
  }
}

export async function getLocalReservationByExternalRef(externalRefId: string): Promise<ReservationRow | null> {
  try {
    const sql = 'SELECT * FROM reservations WHERE external_ref_id = ?';
    const rows = await query<ReservationRow[]>(sql, [externalRefId]);
    return rows?.[0] || null;
  } catch (error) {
    logError(`[LOCAL] Error getting local reservation by external_ref_id: ${externalRefId}`, error);
    throw error;
  }
}


export async function updateLocalPaymentStatusByExternalRef(
  params: {
    externalRefId: string;
    paymentStatus: PaymentStatus;
    transactionId: string;
  }
): Promise<boolean> {
  try {
    const sql = 'UPDATE reservations SET payment_status = ?, transaction_id = ? WHERE external_ref_id = ?';
    const { externalRefId, paymentStatus, transactionId } = params;
    
    const result = await query<ResultSetHeader>(sql, [paymentStatus, transactionId, externalRefId]);
    return Boolean(result?.affectedRows);
  } catch (error) {
    logError(`[LOCAL] Error updating local payment status for external_ref_id: ${params.externalRefId}`, error, { paymentStatus: params.paymentStatus, transactionId: params.transactionId });
    throw error;
  }
}