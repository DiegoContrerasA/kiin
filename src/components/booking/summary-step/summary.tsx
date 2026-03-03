import { Button, buttonVariants } from "@/components/ui/button"
import { CDN_IMAGE_URL } from "@/config/constants"
import { formatDate } from "@/lib/dates"
import { formatNumber } from "@/lib/format-numbers"
import { useBooking } from "@/provider/booking-provider"

const Summary = () => {

    const { room,roomSearchParams, nights, totalPrice } = useBooking()
    
    return (
        <section className="bg-foreground text-white/80">
            <picture className="relative">
                <img className="w-full h-[300px] object-cover" src={`${CDN_IMAGE_URL}${room?.photos[0]}`} alt="" />
                <figcaption className="absolute inset-0 bg-gradient-to-b from-black/2 to-foreground p-4 w-full h-full flex flex-col justify-end">
                    <h3 className="text-base font-semibold">MEDELLIN - EL POBLADO</h3>
                    <p className="text-xs text-white/60">{room?.name}</p>
                </figcaption>
            </picture>
            <div className="px-6 pt-6 pb-10">
                <div className="border-y border-white/20 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs tracking-wide text-white/60">Check-in</p>
                            <p className="text-sm font-medium">{formatDate(roomSearchParams?.range?.from, "LLL dd, y")}</p>
                        </div>
                        <div>
                            <p className="text-xs tracking-wide text-white/60">Check-out</p>
                            <p className="text-sm font-medium">{formatDate(roomSearchParams?.range?.to, "LLL dd, y")}</p>
                        </div>
                    </div>
                </div>
                 <div className="py-6 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-xs text-white/60">{nights} nights x {roomSearchParams?.guests ?? '2'} guest</span>
                        <span className="font-medium text-sm">{formatNumber(totalPrice ?? 0)}USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-xs text-white/60">Pet fee</span>
                        <span className="font-medium text-sm">$0.00 USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-xs text-white/60">Airport pickup</span>
                        <span className="font-medium text-sm">$0.00 USD</span>
                    </div>

                    <div className="border-t border-white/20 py-6">
                        <div className="flex justify-between">
                            <span className="font-semibold text-white/60">DEPOSIT TOTAL</span>
                            <span className="font-bold">$512.10 USD</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <Button size="xl" variant="default" type="submit" className="w-full hover:brightness-110 cursor-pointer">
                        BOOK NOW
                    </Button>
                    <a href="https://api.whatsapp.com/send?phone=573232230942&text=Hello%0AI%27m%20coming%20from%20the%20website" target="_blank" rel="noopener noreferrer" className={buttonVariants({size: "xl", variant: "outline", className: "w-full"})}>
                        CONTACT ADMIN
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Summary