'use server'

import { TypologiesResponse, Typology } from '@/types/room';
import CONFIG from '../config';
import { calculateNights, calculatePrice } from '@/lib/pms';
import { getTRM } from './get-trm';

interface GetRoomsParams {
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
}

export const enrichRoomsWithPricing = async (
    data: TypologiesResponse,
    checkIn: string,
    checkOut: string,
    trm: number
): Promise<TypologiesResponse> => {
    if (!data.typologies) return data;

    const nights = calculateNights({
        checkIn,
        checkOut
    });

    data.typologies = data.typologies.map((typology: Typology) => ({
        ...typology,
        priceInUsd: calculatePrice({
            price: typology.priceByNight,
            trm,
            nights
        }),
        trm,
        nights
    }));

    return data;
};

export const getRoomsFromPMS = async ({
    checkIn,
    checkOut,
    adults,
    children
}: GetRoomsParams): Promise<TypologiesResponse | undefined> => {
    if (!checkIn || !checkOut || !adults || !children) {
        return undefined;
    }

    const [response, trm] = await Promise.all([
        fetch(
            `${CONFIG.PMS_BASE_URL}/room/available?dateStart=${checkIn}&dateEnd=${checkOut}&adults=${adults}&children=${children}`,
            { cache: 'no-store' }
        ),
        getTRM()
    ]);

    const data: TypologiesResponse = await response.json();
    return enrichRoomsWithPricing(data, checkIn, checkOut, trm);
};


