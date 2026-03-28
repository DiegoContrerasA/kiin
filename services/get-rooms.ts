import { TypologiesResponse } from '@/types/room';
import CONFIG from '../config';

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
}: GetRoomsParams): Promise<TypologiesResponse | undefined> => {
    if (!checkIn || !checkOut || !adults || !children) {
        return undefined;
    }
    const response = await fetch(`${CONFIG.PMS_BASE_URL}/room/available?dateStart=${checkIn}&dateEnd=${checkOut}&adults=${adults}&children=${children}`, {
        cache: "no-store"
    });
    const data = await response.json();
    return data;
};
