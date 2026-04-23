// ============ Autocore Payment Link Types ============

import { PaymentStatus } from "./localdb";

export interface AutocoreRedirectOptions {
  success_url: string;
  failure_url: string;
}

export interface AutocorePaymentLinkRequest {
  guest_name: string;
  email: string;
  country_code: string;
  phone: string;
  amount: number;
  booking_dates: string;
  description: string;
  available_hours: number;
  reservation_id: string;
  external_ref_id: string;
  currency: string;
  allowed_payment_options: ('nequi' | 'daviplata' | 'pse' | 'credit_card')[];
  temp_webhook_url: string;
  redirect: AutocoreRedirectOptions;
}

export interface AutocorePaymentLinkSuccess {
  msg: string;
  url: string;
  code: string;
}

export interface AutocorePaymentLinkError {
  code: string | number;
  message: string;
  detail?: string;
}

export interface AutocorePaymentLinkResponse {
  msg?: string;
  url?: string;
  code?: string;
  message?: string;
  detail?: string;
}

export interface AutocorePaymentLinkResponseSuccess {
  success: true;
  data: {
    url: string;
  };
}

export interface AutocorePaymentLinkResponseError {
  success: false;
  error: string;
  code?: string;
}

export type AutocorePaymentLinkResult = AutocorePaymentLinkResponseSuccess | AutocorePaymentLinkResponseError;

// ============ Autocore Webhook Types ============

export type AutocorePaymentStatus = 
  | 'Aplicado' 
  | 'En proceso' 
  | 'Tarjeta no válida' 
  | 'Rechazado' 
  | 'Error';

export type AutocoreTransactionType = 'charge' | 'refund';
export type AutocoreStatusCode = 'applied' | 'in_process' | 'invalid_card' | 'rejected' | 'error';

export interface AutocorePaymentDetails {
  type: AutocoreTransactionType;
  id: string;
  external_ref_id: string;
  status_code: AutocoreStatusCode;
  status_detail: string;
  comments: string;
  transaction_id: string;
  transaction_date: string;
  carrier: string;
  pay_platform: string;
}

export interface AutocorePaymentWebhook {
  payment_status: PaymentStatus;
  amount: number;
  payment_date: string;
  company: string;
  hotel: string;
  voucher_url: string;
  transaction_id: string;
  external_ref_id: string;
  details: AutocorePaymentDetails;
}

export interface AutocoreWebhookError {
  code: string | number;
  message: string;
  detail?: string;
}

export type AutocoreWebhookResponse = AutocorePaymentWebhook | AutocoreWebhookError;
