/* eslint-disable @next/next/no-img-element */
import { Lightbulb } from "lucide-react";
import { currencyFormat, formatDate } from "@/lib/mappers";
import { getReservationAction } from "@/actions/get-reservation-action";
import { PaymentStatus } from "@/types/localdb";
import PaymentStatusDisplay from "@/components/payment-status";
import { buttonVariants } from "@/components/ui/button";

interface ThankYouPageProps {
  searchParams: Promise<{
    confirmationNumber: string;
  }>;
}

const ThankYouPage = async (props: ThankYouPageProps) => {
  const searchParams = await props.searchParams;
  const { start_date, end_date, deposit, posts, status, reservationId } = await getReservationAction(searchParams.confirmationNumber);

  return (
    <section className="max-w-4xl mx-auto w-full px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-6xl font-light ">Thank you</h1>
        <p className="text-center text-base italic">Your reservation has been successfully confirmed.</p>
      </div>

      <div className="space-y-16 max-w-3xl mx-auto">
        {/* Purchase Summary */}
        <section className="transition-all duration-500">
          <h2 className="text-2xl font-bold pb-2 border-b border-muted-foreground/20 mb-8">Confirm and Payment</h2>
          <PaymentStatusDisplay status={status as PaymentStatus} reservationId={reservationId} />
          <div className="grid grid-cols-1 md:grid-cols-2 items-start bg-foreground text-white rounded-lg overflow-hidden shadow-sm my-4">
            <div className="h-full overflow-hidden">
              <img
                alt="Apartment Superior Medellín"
                className="w-full h-full object-cover"
                src='https://kiinliving.com/wp-content/uploads/2026/03/LejosKiin-1024x576.webp'
              />
            </div>
            <div className="flex flex-col h-full p-6">
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em]  font-bold mb-2 block">Kiin Living</span>
                <p className=" text-xs">Medellín, Colombia</p>
              </div>
              <div className="space-y-4 mb-2">
                <div className="flex justify-between items-baseline border-b border-white/20 py-2">
                  <span className="text-xs  uppercase tracking-widest">Check-in</span>
                  <span className="text-sm font-medium">
                    {formatDate(start_date)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/20 py-2">
                  <span className="text-xs  uppercase tracking-widest">Check-out</span>
                  <span className="text-sm font-medium">
                    {formatDate(end_date)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/20 py-4">
                  <span className="text-xs  uppercase tracking-widest">Deposit</span>
                  <span className="text-xl font-bold ">{currencyFormat(deposit)}</span>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-xs leading-relaxed  italic font-light opacity-80">
                  Note: Upon arrival at our coliving, you will be charged the final balance minus the deposit paid today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section>
          <h2 className="text-2xl font-bold pb-2 border-b border-muted-foreground/20 mb-8">What&apos;s Next</h2>
          <div className="max-w-2xl">
            <p className=" text-lg mb-12 leading-relaxed font-light">
              We will soon contact you to coordinate your arrival details and answer any questions. In the meantime, feel free to reach out to our team.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
              <a href="https://api.whatsapp.com/send?phone=573232230942&text=Hello%0AI%27m%20coming%20from%20the%20website" target="_blank" rel="noopener noreferrer" className="group">
                <span className="text-[10px] uppercase tracking-widest  block mb-2">WhatsApp</span>
                <span className="text-sm font-medium  group-hover:text-[#824c2f] transition-colors border-b border-transparent group-hover:border-[#824c2f] pb-1">+57 323 223 0942</span>
              </a>
              <a href="mailto:info@kiinliving.co" className="group">
                <span className="text-[10px] uppercase tracking-widest  block mb-2">Email</span>
                <span className="text-sm font-medium  group-hover:text-[#824c2f] transition-colors border-b border-transparent group-hover:border-[#824c2f] pb-1">info@kiinliving.co</span>
              </a>
              <a href="https://www.instagram.com/kiin.living/" target="_blank" rel="noopener noreferrer" className="group">
                <span className="text-[10px] uppercase tracking-widest  block mb-2">Instagram</span>
                <span className="text-sm font-medium  group-hover:text-[#824c2f] transition-colors border-b border-transparent group-hover:border-[#824c2f] pb-1">@kiin.living</span>
              </a>
            </div>
            <div className=" border bg-brand/5  rounded-lg p-4 max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="bg-brand/10 flex p-2 rounded-md">
                  <Lightbulb className="w-5 h-5  shrink-0 mt-0.5" />
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">
                    NOTE
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Upon move-in, we require full payment of the monthly rent and a deposit of $1,000,000 COP, which will only be used if any damage occurs to the room or property. </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col md:flex-row items-center cursor-pointer border-b first:border-t border-muted-foreground/20 p-4">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#824c2f] font-bold mb-2 block">Article</span>
                  <h3 className="font-medium  transition-all">{post.title}</h3>
                  <p className="text-xs  mt-2 line-clamp-1">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="text-center mt-32">
        <h3 className="text-2xl font-light italic text-muted-foreground/50">See you very soon...</h3>
      </div>
      <div className="flex w-full justify-center mt-4">
        <a href="https://kiinliving.com/" className={buttonVariants({
          variant: 'default',
          size: 'xl'
        })}>
          Back to website
        </a>
      </div>
    </section>
  );
};

export default ThankYouPage;