import { getRooms } from "@/services/get-rooms";
import NoResults from "./no-results";

interface ApartmentsProps {
    params: {
        checkIn?: string;
        checkOut?: string;
        adults?: string;
        children?: string;
    }
}

const Apartments = async ({ params }: ApartmentsProps) => {
    const  rooms = await getRooms(params);

    if(!rooms?.typologies?.length) {
        return <NoResults />
    }

    return (
        <div className="break-all">
            {JSON.stringify(rooms)}
        </div>
    )
}

export default Apartments   