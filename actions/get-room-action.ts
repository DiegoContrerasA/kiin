'use server'

import { getPmsAvaliableRooms } from '@/services/pms/get-pms-avaliable-rooms';
import { PmsTypology } from '@/types/pms';



interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
}

export const getRoomAction = async ({
    checkIn,
    checkOut,
    adults,
    children
}: GetRoomsParams): Promise<PmsTypology[] | undefined> => {
    if (!checkIn || !checkOut || !adults || !children) {
        return undefined;
    }
    
    return await getPmsAvaliableRooms({
        checkIn,
        checkOut,
        adults,
        children
    })
};


