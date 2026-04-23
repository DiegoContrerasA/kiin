import { getRoomByIdAction } from "@/actions/get-room-by-id-action";
import SummaryForm from "@/components/booking/checkout/form";

interface CheckoutPageProps {
  searchParams: Promise<{
    roomId: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
  }>;
}

const CheckoutPage = async (props: CheckoutPageProps) => {

  const searchParams = await props.searchParams;
  const selectedRoom = await getRoomByIdAction(searchParams);

  return <SummaryForm selectedRoom={selectedRoom} />
};

export default CheckoutPage; 