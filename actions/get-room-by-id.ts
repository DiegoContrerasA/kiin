'use server'

import { Typology } from '@/types/room';
import { redirect } from 'next/navigation';
import { getRoomFromPms } from '@/services/get-room-from-pms';

interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    roomId?: string;
}

export const getRoomById = async ({
    checkIn,
    checkOut,
    adults,
    children,
    roomId
}: GetRoomsParams): Promise<Typology> => {
    if (!checkIn || !checkOut || !adults || !children || !roomId) {
        return redirect("/");
    }

    const rooms = await getRoomFromPms({ checkIn, checkOut, adults, children });

    if (!rooms) redirect("/");

    const room = rooms.find((r: Typology) => r._id === roomId);
    if (!room) return redirect("/");

    return room;
};


