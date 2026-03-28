import { differenceInDays, parseISO } from 'date-fns';

export const calculatePrice = ({
    price,
    trm,
    nights
}: {
    price: number;
    trm: number;
    nights: number;
}): number => {
    if (!price || !trm || !nights) return 0;
    const priceInUsd = Math.round((price / trm) * nights);
     const base = Math.round(priceInUsd / 2)
    return nights < 19 ? base * 2 : base;
};

export const calculateNights = ({
    checkIn,
    checkOut
}: {
    checkIn: string;
    checkOut: string;
}): number => {
    return differenceInDays(parseISO(checkOut), parseISO(checkIn));
};
