'use server'

import { Typology } from '@/types/room';
import { calculateNights, calculatePrice } from '@/lib/pms';
import { getTRM } from './get-trm';
import { getRoomsFromPMS } from './get-rooms';
import { redirect } from 'next/navigation';

interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    roomId?: string;
}

export const getRoomByIdFromPMS = async ({
    checkIn,
    checkOut,
    adults,
    children,
    roomId
}: GetRoomsParams): Promise<Typology> => {
    if (!checkIn || !checkOut || !adults || !children || !roomId) {
        return redirect("/");
    }

    const [rooms, trm] = await Promise.all([
        getRoomsFromPMS({ checkIn, checkOut, adults, children }),
        getTRM()
    ]);

    if (!rooms) redirect("/");

    const room = rooms.find((r: Typology) => r._id === roomId);
    if (!room) return redirect("/");

    const nights = calculateNights({
        checkIn: checkIn || '',
        checkOut: checkOut || ''
    });

    return {
        ...room,
        priceInUsd: calculatePrice({
            price: room.priceByNight,
            trm,
            nights
        }),
        search: {
            checkIn,
            checkOut,
            adults,
            children,
        },
        trm,
        nights
    };
};


