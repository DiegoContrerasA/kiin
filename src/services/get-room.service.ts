import type { RoomResponse } from "@/interfaces/booking"
import axios from "axios"

export const getRooms = (url: string) => {
    return axios.get<RoomResponse>(url).then(data => data.data?.typologies ?? [])
}