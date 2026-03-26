export interface RoomRateDetailed {
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

export interface Rate {
  rateID: number;
  roomRate: number;
  totalRate: number;
  roomsAvailable: number;
  roomTypeID: number;
  roomTypeName: string;
  isDerived: boolean;
  roomRateDetailed: RoomRateDetailed[];
}

export interface Typology {
  available: number;
  rates: Rate[];
  _id: string;
  name: string;
  price: number;
  description: string;
  photos: string[];
  roomCount: number[];
  bathroomCount: number[];
  squareMeters: number;
  typeOfBed: 'individual' | 'doble' | 'king' | 'queen';
  qtyFull: number;
}

export interface TypologiesResponse {
  typologies: Typology[];
}
