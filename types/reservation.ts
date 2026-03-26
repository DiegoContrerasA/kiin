export interface ExtraData {
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

export interface User {
  name: string;
  lastName: string;
  email: string;
  documentID: string;
  documentType: string;
  phone: string;
  country: string;
  nationality: string;
  gender: string;
  extraData?: ExtraData;
}

export interface Reservation {
  typology: string;
  dateStart: string;
  dateEnd: string;
  adults: number;
  children: number;
  withPet: boolean;
  withTransfer: boolean;
  specialRequest?: string;
}

export interface ReservationRequest {
  user: User;
  reservation: Reservation;
  isTest: boolean;
}


export interface RateItem {
  date: string;
  rate: number;
  totalRate: number;
}

export type ReservationStatus = 'not_confirmed' | 'confirmed' | 'cancelled' | 'completed';

export interface ReservationResponse {
  _id: string;
  typology: string;
  dateStart: string;
  dateEnd: string;
  adults: number;
  children: number;
  specialRequest?: string;
  total: number;
  rates: RateItem[];
  user: string;
  billingUser: string;
  place: string;
  status: ReservationStatus;
  totalUsers: number;
  nights: number;
  ref: string;
}

export interface ReservationApiResponse {
  reservation: ReservationResponse;
}
