import { AutocorePaymentLinkRequest } from "@/types/autocore";
import { PmsReservation, PmsTypology, PmsUser } from "@/types/pms";

interface autocoreAdapterProps {
 user: PmsUser;
 typology: PmsTypology;
 reservation: PmsReservation;
 external_ref_id: string;
 reservation_id: string;
 deposit: number;
}
export const autocoreAdapter = ({user, typology, reservation, external_ref_id, reservation_id, deposit}: autocoreAdapterProps) : AutocorePaymentLinkRequest => {
    
   const redirect = `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?confirmationNumber=${external_ref_id}`;
  return {
      guest_name: `${user.name} ${user.lastName}`,
      email: user.email,
      country_code: user.country,
      phone: user.phone,
      amount: deposit,
      booking_dates: `${reservation.dateStart} to ${reservation.dateEnd}`,
      description: `Reservation for ${typology.name}`,
      available_hours: 24,
      currency: 'USD',
      reservation_id: reservation_id,
      external_ref_id: external_ref_id,
      allowed_payment_options: ['credit_card'],
      temp_webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/payment`,
      redirect: {
        success_url: redirect,
        failure_url: redirect,
      },
    
    }
}