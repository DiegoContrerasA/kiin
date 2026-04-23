import { PmsReservation } from '@/types/pms';

export interface ReservationCreationParams {
  typologyId:string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalAmount?: number;
  withPet?:boolean
  withTransfer?:boolean
}


export function adaptToPmsReservation({
  typologyId,
  checkIn,
  checkOut,
  adults,
  children,
  withPet = false,
  withTransfer = false,
}: ReservationCreationParams): PmsReservation {

  
  return {
    typology: typologyId,
    dateStart: checkIn,
    dateEnd: checkOut,
    adults,
    children,
    withPet: withPet,
    withTransfer: withTransfer,
    specialRequest: '', // Can be extended to include special requests if needed
  };
}
