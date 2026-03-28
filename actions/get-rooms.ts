'use server'

import { TypologiesResponse, Typology } from '@/types/room';
import CONFIG from '../config';

interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
}

const fetchAvailableRooms = async (params: GetRoomsParams) => {
    const { checkIn, checkOut, adults, children } = params;
    const response = await fetch(
        `${CONFIG.PMS_BASE_URL}/room/available?dateStart=${checkIn}&dateEnd=${checkOut}&adults=${adults}&children=${children}`,
        { next: { revalidate: 300 } }
    );
    const data: TypologiesResponse = await response.json();
    return data;
};

export const getRoomsFromPMS = async ({
    checkIn,
    checkOut,
    adults,
    children
}: GetRoomsParams): Promise<Typology[] | undefined> => {
    if (!checkIn || !checkOut || !adults || !children) {
        return undefined;
    }

    const data = await fetchAvailableRooms({ checkIn, checkOut, adults, children });
    return data?.typologies ?? [];
};


