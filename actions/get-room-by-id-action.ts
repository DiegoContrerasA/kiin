'use server'

import { getPmsAvaliableRooms } from '@/services/pms/get-pms-avaliable-rooms';
import { PmsTypology } from '@/types/pms';

import { redirect } from 'next/navigation';


interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    roomId?: string;
}

export const getRoomByIdAction = async ({
    checkIn,
    checkOut,
    adults,
    children,
    roomId
}: GetRoomsParams): Promise<PmsTypology> => {
    if (!checkIn || !checkOut || !adults || !children || !roomId) {
        return redirect("/");
    }

    const rooms = await getPmsAvaliableRooms({ checkIn, checkOut, adults, children });

    if (!rooms) redirect("/");

    const room = rooms.find((r: PmsTypology) => r._id === roomId);
    if (!room) return redirect("/");

    return room;
};


