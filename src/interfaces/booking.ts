export interface RoomRateDetailed {
  [key: string]: unknown;
}

export interface Rate {
  totalRate: number;
  roomRateDetailed: RoomRateDetailed[];
}

export interface Room {
  available: number;
  rates: Rate[];
  _id: string;
  name: string;
  price: number;
  deleted: boolean;
  isVirtual: boolean;
  cloudID: string;
  qtyFull: number;
  minStay: number;
  description: string;
  amenities: string[]; // or Amenities[] if you have a specific interface
  photos: string[];
  roomCount: number[];
  bathroomCount: number[];
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  priceByNight: number;
  squareMeters: number;
  typeOfBed: string;
  prices: unknown[]; // Add specific type if known
  id: string;
  totalStayPrice: number;
}

export interface RoomResponse {
  typologies: Room[];
}
