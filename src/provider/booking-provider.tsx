/* eslint-disable react-refresh/only-export-components */
import type { Room } from "@/interfaces/booking";
import type { GuestSchemaValues } from "@/schemas/guest-schema";
import { createContext, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";


interface BookingState {
    room: Room | null
    roomSearchParams: {
        range?: DateRange | undefined
        guests?: string
    }
    user?: GuestSchemaValues
    nights?: number
    totalPrice?: number
}

interface BookingContext extends BookingState {
    setRoom: ({ room, nights, totalPrice }: { room: Room, nights?: number, totalPrice?: number }) => void
    setUser: (user: GuestSchemaValues) => void
    setRoomSearchParams: (roomSearchParams: BookingContext['roomSearchParams']) => void
    reset: () => void
}

const INITIAL_STATE: BookingState = {
    room: null,
    roomSearchParams: {
       range: undefined,
        guests: undefined,
    },
    user: undefined,
    nights: undefined,
    totalPrice: undefined
}

const BookingContext = createContext<BookingContext>({
    ...INITIAL_STATE,
    setRoom: () => { },
    setUser: () => { },
    setRoomSearchParams: () => { },
    reset: () => { }
})

const BookingProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, setState] = useState<BookingState>({ ...INITIAL_STATE })

    const setRoom = ({ room, nights, totalPrice }: { room: Room, nights?: number, totalPrice?: number }) => {
        setState((prev) => ({ ...prev, room, nights, totalPrice }))
    }

    const setUser = (user: GuestSchemaValues) => {
        setState((prev) => ({ ...prev, user }))
    }

    const setRoomSearchParams = (roomSearchParams: BookingContext['roomSearchParams']) => {
        setState((prev) => ({ ...prev, roomSearchParams }))
    }

    const reset = () => {
        setState({ ...INITIAL_STATE })
    }

    return <BookingContext.Provider value={{
        ...state,
        setRoom,
        setUser,
        setRoomSearchParams, reset
    }}>
        {children}
    </BookingContext.Provider>;
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}


export default BookingProvider;