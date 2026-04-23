
import { calculateNights, calculatePrice } from "@/lib/pms";
import { getTrm } from "./get-trm";
import CONFIG from "@/config";
import { PmsTypologiesResponse } from "@/types/pms";

interface Params {
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
}

export const fethAvaliableRooms = async (params: Params) => {
    try {
        const { checkIn, checkOut, adults, children } = params;
        const response = await fetch(
            `${CONFIG.PMS_BASE_URL}/room/available?dateStart=${checkIn}&dateEnd=${checkOut}&adults=${adults}&children=${children}`,
            { next: { revalidate: 300 } }
        );
        const data: PmsTypologiesResponse = await response.json();
        if (!data?.typologies) return undefined
        return data?.typologies

    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getPmsAvaliableRooms = async (params: Params) => {
    try {
        const [data, trm] = await Promise.all([
            fethAvaliableRooms(params),
            getTrm()
        ])

        if (!data || !trm) return [];

        const nights = calculateNights({
            checkIn: params.checkIn || '',
            checkOut: params.checkOut || ''
        })

        return data.map((room) => ({
            ...room,
            roomPrice: calculatePrice({
                price: room.priceByNight,
                trm,
                nights
            }),
            nights,
            startDate: params.checkIn,
            endDate: params.checkOut,
            adults: params.adults,
            children: params.children,
        }));

    } catch {
        return []
    }
}