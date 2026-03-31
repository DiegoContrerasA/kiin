'use client'

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CONFIG from "@/config"
import { currencyFormat } from "@/lib/mappers"
import { Typology } from "@/types/room"
import { BedDouble, Maximize2, Toilet } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { Lightbox } from "yet-another-react-lightbox";

const RoomCard = ({
    room
}: {
    room: Typology
}) => {

    const searchParams = useSearchParams();
    const [showLightbox, setShowLightbox] = useState<{ src: string }[] | null>(null)
    const buildCheckoutUrl = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('roomId', room._id);
        return `/checkout?${params.toString()}`;
    }, [room._id, searchParams]);

    const slides = useMemo(() => room.photos.map((photo) => ({
        src: `${CONFIG.IMAGE_CDN_BASE_URL}/${photo}`,
    })), [room.photos]);

    return (
        <article className="bg-white rounded-lg overflow-hidden">
            <button onClick={() => setShowLightbox(slides)} className="relative overflow-hidden rounded-lg group">
                <img
                    className="w-full h-[300px] object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                    src={`${CONFIG.IMAGE_CDN_BASE_URL}/${room.photos[0]}`}
                    alt={room.name}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white size-8" />
                </div>
            </button>
            <div className="p-4">
                <h3 className="font-bold mb-2 line-clamp-2">{room.name}</h3>
                <p className="line-clamp-4 text-muted-foreground text-sm mb-3">{room.description}</p>
                <div className="flex justify-between gap-3">
                    <div className="flex gap-3">
                        <span className="flex gap-2 items-center"><BedDouble className="size-3.5" />{room.roomCount?.[0] ?? 1}</span>
                        <span className="flex gap-2 items-center"><Toilet className="size-3.5" />{room.bathroomCount?.[0] ?? 1}</span>
                    </div>
                    <p className="text-lg font-bold text-brand">{currencyFormat(room.priceInUsd)}USD<span className="text-muted-foreground text-xs"> / {room.nights} nights</span></p>
                </div>
                <Separator className="my-4" />
                <Link href={buildCheckoutUrl} className={buttonVariants({ variant: 'default', className: 'w-full', size: 'xl' })}>
                    SELECT ROOM
                </Link>
            </div>
            {showLightbox && (
                <Lightbox
                    slides={showLightbox}
                    open={Boolean(showLightbox)}
                    close={() => setShowLightbox(null)}
                />
            )}
        </article>
    )
}

export default RoomCard