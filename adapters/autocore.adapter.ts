import { AutocorePaymentLinkRequest } from "@/types/autocore";
import { PmsReservation, PmsTypology, PmsUser } from "@/types/pms";

interface autocoreAdapterProps {
 user: PmsUser;
 typology: PmsTypology;
 reservation: PmsReservation;
 external_ref_id: string;
 reservation_id: string;
}
export const autocoreAdapter = ({user, typology, reservation, external_ref_id, reservation_id}: autocoreAdapterProps) : AutocorePaymentLinkRequest => {
    return {
      guest_name: `${user.name} ${user.lastName}`,
      email: user.email,
      country_code: user.country,
      phone: user.phone,
      amount: typology.price,
      booking_dates: `${reservation.dateStart} to ${reservation.dateEnd}`,
      description: `Reservation for ${typology.name}`,
      available_hours: 24,
      reservation_id: reservation_id,
      external_ref_id: external_ref_id,
      allowed_payment_options: ['nequi', 'daviplata', 'pse', 'credit_card'],
      temp_webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/payment`,
      redirect: {
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?ref=${external_ref_id}`,
        failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservation-error?ref=${external_ref_id}`,
      },
    
    }
}