import { getRooms } from "@/services/get-room.service"
import { useQuery } from "@tanstack/react-query"



export const useGetRooms = () => {

    return useQuery({
        queryKey: ['rooms'],
        queryFn: () => getRooms('https://api.kiinliving.com/api/v1/room/available')
    })

    
}   