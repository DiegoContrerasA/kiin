import type { Room } from "@/interfaces/booking"
import { Button } from "@/components/ui/button"
import { CDN_IMAGE_URL } from "@/config/constants"
import { BedDouble, Maximize2, Toilet } from "lucide-react"
import { useMemo, memo } from "react"
import {  useNavigate, useSearchParams } from "react-router"
import { differenceInDays } from "date-fns"
import { useTRM } from "@/hooks/use-trm"
import { useBooking } from "@/provider/booking-provider"
import { formatNumber } from "@/lib/format-numbers"

interface AparmentCardProps {
    room: Room
    onOpenLightbox: (photos: { src: string }[]) => void
}

const AparmentCard = ({
    room,
    onOpenLightbox
}: AparmentCardProps) => {
    const [searchParams] = useSearchParams()
    const { setRoom } = useBooking()
    const navigate = useNavigate()
    const { data: trm = 3800, isLoading } = useTRM()

    const slides = useMemo(() => room.photos.map((photo) => ({
        src: `${CDN_IMAGE_URL}${photo}`,
    })), [room.photos]);

      const nights = useMemo(() => {
         const checkOut = searchParams.get('checkOut')
         const checkIn = searchParams.get('checkIn')
         if (!checkIn || !checkOut) return undefined
        return differenceInDays(new Date(checkOut), new Date(checkIn))
      }, [searchParams])

    const totalPrice = useMemo(() => {
        if(!nights) return undefined

        const nightly = room.priceByNight || 0

        const totalUsd = trm ? Math.round((nightly / trm) * nights) : 0
        const base = Math.round(totalUsd / 2)
        return  nights < 19 ? base * 2 : base
    }, [room.priceByNight, trm, nights, ])

    const onSelectRoom = () => {
        setRoom({ room, nights, totalPrice })
        navigate('/summary')
    }

    return (
        <>
            <article className="flex flex-col gap-4">
                <button onClick={() => onOpenLightbox(slides)} className="relative overflow-hidden rounded-lg group">
                    <img
                        className="w-full h-[300px] object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                        src={`${CDN_IMAGE_URL}${room.photos[0]}`}
                        alt={room.name}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Maximize2 className="text-white size-8" />
                    </div>
                </button>
                <div>
                    <h4 className="text-xl font-bold mb-2">{room.name}</h4>

                    <p className="line-clamp-3 text-sm text-muted-foreground">{room.description}</p>
                   
                </div>               
                <div className="flex justify-between border-t border-muted-foreground/50 pt-4">
                     <div className="flex gap-4 text-muted-foreground text-xs font-semibold">
                   <span className="flex gap-2 items-center"><BedDouble className="size-3.5" />{room.roomCount?.[0] ?? 1}</span>
                   <span className="flex gap-2 items-center"><Toilet className="size-3.5" />{room.bathroomCount?.[0] ?? 1}</span>
                </div>
                     {isLoading ?
                        <span className="bg-card w-24 h-8 rounded" /> :
                        (
                            <p className="text-lg font-bold text-primary">{formatNumber(totalPrice)}USD<span className="text-muted-foreground text-xs"> / {nights} nights</span></p>
                        )}
                </div>
                <Button size="xl" variant="outline" className="hover:bg-primary hover:text-white transition-all duration-300" onClick={onSelectRoom}>
                    Select Room
                </Button>
            </article>

        </>
    )
}

export default memo(AparmentCard)