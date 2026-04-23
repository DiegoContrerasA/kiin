export interface PmsExtraData {
  maritalStatus?: string;
  spokenLanguages?: string;
  socialMediaProfile?: string;
  linkedInProfile?: string;
  professionalApproach?: string;
  professionalTitle?: string;
  annualIncome?: string;
  activitiesOfInterest?: string;
  lifestyleRanking?: string;
  populationGroupPreference?: string;
  purposeOfTravel?: string;
  howDidYouHearAbout?: string;
  transportationSystem?: string;
}

export interface PmsUser {
  name: string;
  lastName: string;
  email: string;
  documentID: string;
  documentType: string;
  phone: string;
  country: string;
  nationality: string;
  gender: string;
  extraData?: PmsExtraData;
}

export interface PmsReservation {
  typology: string;
  dateStart: string;
  dateEnd: string;
  adults: number;
  children: number;
  withPet: boolean;
  withTransfer: boolean;
  specialRequest?: string;
}

export interface PmsReservationRequest {
  user: PmsUser;
  reservation: PmsReservation;
  isTest: boolean;
}

export interface PmsRateItem {
  date: string;
  rate: number;
  totalRate: number;
}

export type PmsReservationStatus = 'not_confirmed' | 'confirmed' | 'cancelled' | 'completed';

export interface PmsReservationResponse {
  _id: string;
  typology: string;
  dateStart: string;
  dateEnd: string;
  adults: number;
  children: number;
  specialRequest?: string;
  total: number;
  rates: PmsRateItem[];
  user: string;
  billingUser: string;
  place: string;
  status: PmsReservationStatus;
  totalUsers: number;
  nights: number;
  ref: string;
}

export interface PmsReservationApiResponse {
  reservation: PmsReservationResponse;
}

export interface PmsRoomRateDetailed {
  date: string;
  rate: number;
  totalRate: number;
  roomsAvailable: number;
  closedToArrival: boolean;
  closedToDeparture: boolean;
  minLos: number;
  maxLos: number;
  cutOff: number;
  lastMinuteBooking: number;
}

export interface PmsRate {
  rateID: number;
  roomRate: number;
  totalRate: number;
  roomsAvailable: number;
  roomTypeID: number;
  roomTypeName: string;
  isDerived: boolean;
  roomRateDetailed: PmsRoomRateDetailed[];
}

export interface PmsTypology {
  available: number;
  rates: PmsRate[];
  _id: string;
  name: string;
  price: number;
  priceByNight: number;
  description: string;
  photos: string[];
  roomCount: number[];
  bathroomCount: number[];
  squareMeters: number;
  typeOfBed: 'individual' | 'doble' | 'king' | 'queen';
  qtyFull: number;
  roomPrice?: number;
  trm?: number;
  nights?: number;
  startDate?: string;
  endDate?: string;
  adults?: string;
  children?: string;
}

export interface PmsTypologiesResponse {
  typologies: PmsTypology[];
}

// WordPress post interfaces (part of PMS system)
export interface WPPost {
  id: number;
  title: string;
  link: string;
  excerpt: string;
  date: string;
}

export interface WPPostResponse {
  id: number;
  title: { rendered: string };
  link: string;
  excerpt: { rendered: string };
  date: string;
}

export type PmsPaymentMethod = 'mixed' | 'card' | 'cash' | 'transfer';
export type PmsPaymentType = 'pago' | 'refund';
export type PmsBalanceType = 'host' | 'guest';

export interface PmsPaymentRequest {
  apiKey?: string;
  booking: string;
  amount: number;
  currency: string;
  paymentMethod: PmsPaymentMethod;
  type: PmsPaymentType;
  balanceType: PmsBalanceType;
  authorization?: string;
  company?: string;
  card?: string;
  trm?: number;
  isForLodging: boolean;
}

export interface PmsPaymentResponse {
  _id: string;
  authorization: string;
  company: string;
  card: string;
  amount: number;
  trm: number;
  currency: string;
  deleted: boolean;
  isCanceled: boolean;
  type: PmsPaymentType;
  balanceType: PmsBalanceType;
  paymentMethod: PmsPaymentMethod;
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

export interface PmsPaymentApiResponse {
  payment: PmsPaymentResponse;
}
