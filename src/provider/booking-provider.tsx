/* eslint-disable react-refresh/only-export-components */
import type { Room } from "@/interfaces/booking";
import type { GuestSchemaValues } from "@/schemas/guest-schema";
import { createContext, useContext, useState } from "react";

interface BookingState {
    room: Room | null
    roomSearchParams: {
        startDate?: Date
        endDate?: Date
        guests?: string
    }
    user?: GuestSchemaValues
}

interface BookingContext extends BookingState {
    setRoom: (room: Room) => void
    setUser: (user: GuestSchemaValues) => void
    setRoomSearchParams: (roomSearchParams: BookingContext['roomSearchParams']) => void
    reset: () => void
}

const INITIAL_STATE: BookingState = {
    room: null,
    roomSearchParams: {
        startDate: undefined,
        endDate: undefined,
        guests: undefined,
    },
    user: undefined,
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

    const setRoom = (room: Room) => {
        setState((prev) => ({ ...prev, room }))
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