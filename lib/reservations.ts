import { query } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ReservationRow extends RowDataPacket {
  id: number;
  reservation_id: string | null;
  external_ref_id: string;
  hotel_id: string | null;
  amount_in_cop: number | null;
  amount_in_usd: number | null;
  user_name: string | null;
  user_last_name: string | null;
  document_type: string | null;
  document_number: string | null;
  gender: string | null;
  email: string;
  phone: string | null;
  nationality: string | null;
  country: string | null;
  social_media_profile: string | null;
  airport_pickup: boolean;
  pet_fee: boolean;
  typology: string | null;
  reservation_typology: string | null;
  reservation_date_start: Date | null;
  reservation_date_end: Date | null;
  reservation_adults: number;
  reservation_children: number;
  reservation_with_pet: boolean;
  reservation_with_transfer: boolean;
  reservation_special_request: string | null;
  payment: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateReservationParams {
  reservation_id?: string;
  external_ref_id: string;
  hotel_id?: string;
  amount_in_cop?: number;
  amount_in_usd?: number;
  user_name?: string;
  user_last_name?: string;
  document_type?: string;
  document_number?: string;
  gender?: string;
  email: string;
  phone?: string;
  nationality?: string;
  country?: string;
  social_media_profile?: string;
  airport_pickup?: boolean;
  pet_fee?: boolean;
  typology?: object;
  reservation_typology?: string;
  reservation_date_start?: string;
  reservation_date_end?: string;
  reservation_adults?: number;
  reservation_children?: number;
  reservation_with_pet?: boolean;
  reservation_with_transfer?: boolean;
  reservation_special_request?: string;
}

export  function createReservation(): string {
  return `
    INSERT INTO reservations (
      reservation_id, external_ref_id, hotel_id, amount_in_cop, amount_in_usd,
      user_name, user_last_name, document_type, document_number, gender,
      email, phone, nationality, country, social_media_profile,
      airport_pickup, pet_fee, typology,
      reservation_typology, reservation_date_start, reservation_date_end,
      reservation_adults, reservation_children, reservation_with_pet,
      reservation_with_transfer, reservation_special_request
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
}

export async function getReservationByExternalRef(externalRefId: string): Promise<ReservationRow | null> {
  const sql = 'SELECT * FROM reservations WHERE external_ref_id = ?';
  const rows = await query<ReservationRow[]>(sql, [externalRefId]);
  return rows[0] || null;
}

export async function updatePaymentByExternalRef(
  externalRefId: string,
  payment: object
): Promise<boolean> {
  const sql = 'UPDATE reservations SET payment = ? WHERE external_ref_id = ?';
  const result = await query<ResultSetHeader>(sql, [JSON.stringify(payment), externalRefId]);
  return result.affectedRows > 0;
}
