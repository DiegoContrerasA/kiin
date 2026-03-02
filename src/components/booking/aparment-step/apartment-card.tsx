import type { Room } from "@/interfaces/booking"
import { Button } from "@/components/ui/button"
import { CDN_IMAGE_URL } from "@/config/constants"
import { Maximize2 } from "lucide-react"

import { memo, useMemo } from "react";

interface AparmentCardProps {
    room: Room
    onOpenLightbox: (photos: { src: string }[]) => void
}

const AparmentCard = ({
    room,
    onOpenLightbox
}: AparmentCardProps) => {

    const slides = useMemo(() => room.photos.map((photo) => ({
        src: `${CDN_IMAGE_URL}${photo}`,
    })), [room.photos]);

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
                </div>
                <Button size="xl" variant="outline" className="hover:bg-primary hover:text-white transition-all duration-300" >
                    Select Room
                </Button>
            </article>

        </>
    )
}

export default memo(AparmentCard)