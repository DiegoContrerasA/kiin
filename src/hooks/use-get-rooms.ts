import { getRooms } from "@/services/get-room.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams, useNavigate } from "react-router"
import { useEffect } from "react"



export const useGetRooms = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')

    useEffect(() => {
        if (!checkIn || !checkOut) {
            navigate('/')
        }
    }, [checkIn, checkOut, navigate])

    return useQuery({
        queryKey: ['rooms', checkIn, checkOut, guests],
        queryFn: () => getRooms(`https://api.kiinliving.com/api/v1/room/available?dateStart=${checkIn}&dateEnd=${checkOut}&adults=${guests}`),
        enabled: !!checkIn && !!checkOut
    })

    
} 