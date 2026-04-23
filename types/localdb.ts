import { RowDataPacket } from 'mysql2';
import { PmsUser, PmsReservation, PmsTypology } from './pms';
import { AutocorePaymentWebhook } from './autocore';

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
  user: PmsUser
  typology: PmsTypology
  reservation: PmsReservation
  deposit: number
  payment: AutocorePaymentWebhook | null
  payment_status: string | null
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
}

export interface UpdateReservationParams {
  external_ref_id: string;
  user?: PmsUser;
  typology?: PmsTypology;
  reservation?: PmsReservation;
  deposit?: object;
  payment?: AutocorePaymentWebhook;
  payment_status?: PaymentStatus;
}

export interface ReservationWithParsedData extends Omit<ReservationRow, 'user' | 'typology' | 'reservation' | 'deposit' | 'payment'> {
  user?: PmsUser | null;
  typology?: PmsTypology | null;
  reservation?: PmsReservation | null;
  deposit?: object | null;
  payment?: AutocorePaymentWebhook | null;
}
