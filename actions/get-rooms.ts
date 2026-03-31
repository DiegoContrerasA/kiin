'use server'

import { Typology } from '@/types/room';
import { getRoomFromPms } from '@/services/get-room-from-pms';

interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
}

export const getRooms = async ({
    checkIn,
    checkOut,
    adults,
    children
}: GetRoomsParams): Promise<Typology[] | undefined> => {
    if (!checkIn || !checkOut || !adults || !children) {
        return undefined;
    }
    
    return await getRoomFromPms({
        checkIn,
        checkOut,
        adults,
        children
    })
};


