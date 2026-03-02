import { useGetRooms } from "@/hooks/use-get-rooms"
import AparmentCard from "./apartment-card"
import ApartmentCardSkeleton from "./apartment-card-skeleton"
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";
import { useState } from "react";

const AparmentLists = () => {

    const { data, isLoading, error } = useGetRooms()

    const [showLightbox, setShowLightbox] = useState<{ src: string }[] | null>(null)

    if (isLoading) return [...Array(6)].map((_, index) => (
        <ApartmentCardSkeleton key={index} />
    ))

    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            {data?.map((room) => (
                <AparmentCard
                    key={room._id}
                    room={room}
                    onOpenLightbox={setShowLightbox}
                />))}
            {showLightbox && (
                <Lightbox
                    slides={showLightbox}
                    open={Boolean(showLightbox)}
                    close={() => setShowLightbox(null)}
                />
            )}
        </>
    )



}

export default AparmentLists