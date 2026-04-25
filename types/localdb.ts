import { RowDataPacket } from 'mysql2';

// ============ Payment Status Enum ============
export enum PaymentStatus {
  IN_PROCESS = 'En proceso',
  APPLIED = 'Aplicado',
  REJECTED = 'Rechazado',
  INVALID_CARD = 'Tarjeta no válida'
}

// ============ Local Database Types ============

export interface ReservationRow extends RowDataPacket {
  id: number;
  external_ref_id: string;
  reservation_id: string;
  start_date: string;
  end_date: string;
  deposit: number;
  payment_status: string;
  room_name: string;
  transaction_id: string;
  nights: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateReservationParams {
  external_ref_id: string;
  reservation_id?: string;
  start_date?: string;
  end_date?: string;
  deposit?: number;
  payment_status?: PaymentStatus | null;
  room_name?: string;
  transaction_id?: string;
  nights?: number;
  full_name?: string;
  email?: string;
  phone?: string;
}


