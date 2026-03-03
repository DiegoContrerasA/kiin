import type { Room } from "@/interfaces/booking"
import { Button } from "@/components/ui/button"
import { CDN_IMAGE_URL } from "@/config/constants"
import { Maximize2 } from "lucide-react"
import { useMemo, memo } from "react"
import { useSearchParams } from "react-router"
import { differenceInDays } from "date-fns"
import { useTRM } from "@/hooks/use-trm"

interface AparmentCardProps {
    room: Room
    onOpenLightbox: (photos: { src: string }[]) => void
}

const AparmentCard = ({
    room,
    onOpenLightbox
}: AparmentCardProps) => {
    const [searchParams] = useSearchParams()
    const { data: trm = 3800, isLoading } = useTRM()

    const slides = useMemo(() => room.photos.map((photo) => ({
        src: `${CDN_IMAGE_URL}${photo}`,
    })), [room.photos]);

    const totalPrice = useMemo(() => {
        const checkIn = searchParams.get('checkIn')
        const checkOut = searchParams.get('checkOut')

        if (!checkIn || !checkOut) return null

        const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
        const nightly = room.priceByNight || 0

        const totalUsd = trm ? Math.round((nightly / trm) * nights) : 0
        const base = Math.round(totalUsd / 2)
        const price = nights < 19 ? base * 2 : base

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(price)
    }, [searchParams, room.priceByNight, trm])

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

                    <p className="line-clamp-3 text-muted-foreground">{room.description}</p>
                    {isLoading ?
                        <span className="bg-card w-24 h-8 rounded" /> :
                        (
                            <span className="text-lg font-semibold text-primary">{totalPrice ?? ''}</span>
                        )}
                </div>
                <Button size="xl" variant="outline" className="hover:bg-primary hover:text-white transition-all duration-300" >
                    Select Room
                </Button>
            </article>

        </>
    )
}

export default memo(AparmentCard)