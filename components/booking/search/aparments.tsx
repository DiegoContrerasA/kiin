
import NoResults from "./no-results";
import RoomCard from "./room-card";
import "yet-another-react-lightbox/styles.css";
import { getRoomAction } from "@/actions/get-room-action";

interface ApartmentsProps {
    params: {
        checkIn?: string;
        checkOut?: string;
        adults?: string;
        children?: string;
    }
}

const Apartments = async ({ params }: ApartmentsProps) => {
    const  rooms = await getRoomAction(params);

    if(!rooms?.length) return <NoResults />
    return (
         <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
           {
            rooms.map((room) =><RoomCard key={room._id} room={room} />)
           }
        </section>
    )
}

export default Apartments   