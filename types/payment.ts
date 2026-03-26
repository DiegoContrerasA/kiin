export type PaymentMethod = 'mixed' | 'card' | 'cash' | 'transfer';
export type PaymentType = 'pago' | 'refund';
export type BalanceType = 'host' | 'guest';

export interface PaymentRequest {
  apiKey?: string;
  booking: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  type: PaymentType;
  balanceType: BalanceType;
  authorization?: string;
  company?: string;
  card?: string;
  trm?: number;
  isForLodging: boolean;
}

export interface PaymentResponse {
  _id: string;
  authorization: string;
  company: string;
  card: string;
  amount: number;
  trm: number;
  currency: string;
  deleted: boolean;
  isCanceled: boolean;
  type: PaymentType;
  balanceType: BalanceType;
  paymentMethod: PaymentMethod;
  isForLodging: boolean;
  cancelNote?: string;
  operacion: string;
  booking: string;
  business: string;
  user: string;
  employee: string;
  orderPOS: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentApiResponse {
  payment: PaymentResponse;
}
