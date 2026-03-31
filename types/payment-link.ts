export interface RedirectOptions {
  success_url: string;
  failure_url: string;
}

export interface PaymentLinkRequest {
  source: string;
  hotel_id: number;
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
  allowed_payment_options: ('nequi' | 'daviplata' | 'pse' | 'credit_card')[];
  temp_webhook_url: string;
  redirect: RedirectOptions;
}

export interface PaymentLinkSuccess {
  msg: string;
  url: string;
  code: string;
}

export interface PaymentLinkError {
  code: string | number;
  message: string;
  detail?: string;
}

export interface PaymentLinkResponse {
  msg?: string;
  url?: string;
  code?: string;
  message?: string;
  detail?: string;
}

export interface PaymentLinkResponseSuccess {
  success: true;
  data: {
    url: string;
  };
}

export interface PaymentLinkResponseError {
  success: false;
  error: string;
  code?: string;
}

export type PaymentLinkResult = PaymentLinkResponseSuccess | PaymentLinkResponseError;
