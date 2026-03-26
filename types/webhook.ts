// ============ Webhook Types ============

export type PaymentStatus = 
  | 'Aplicado' 
  | 'En proceso' 
  | 'Tarjeta no válida' 
  | 'Rechazado' 
  | 'Error';

export type TransactionType = 'charge' | 'refund';
export type StatusCode = 'applied' | 'in_process' | 'invalid_card' | 'rejected' | 'error';

export interface PaymentDetails {
  type: TransactionType;
  id: string;
  external_ref_id: string;
  status_code: StatusCode;
  status_detail: string;
  comments: string;
  transaction_id: string;
  transaction_date: string;
  carrier: string;
  pay_platform: string;
}

export interface PaymentWebhook {
  payment_status: PaymentStatus;
  amount: number;
  payment_date: string;
  company: string;
  hotel: string;
  voucher_url: string;
  transaction_id: string;
  external_ref_id: string;
  details: PaymentDetails;
}

export interface WebhookError {
  code: string | number;
  message: string;
  detail?: string;
}

export type WebhookResponse = PaymentWebhook | WebhookError;
