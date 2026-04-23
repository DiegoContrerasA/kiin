'use server'

import { getPmsAvaliableRooms } from '@/services/pms/get-pms-avaliable-rooms';
import { Typology } from '@/types/room';
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
}: GetRoomsParams): Promise<Typology> => {
    if (!checkIn || !checkOut || !adults || !children || !roomId) {
        return redirect("/");
    }

    const rooms = await getPmsAvaliableRooms({ checkIn, checkOut, adults, children });

    if (!rooms) redirect("/");

    const room = rooms.find((r: Typology) => r._id === roomId);
    if (!room) return redirect("/");

    return room;
};


