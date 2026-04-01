import { Button, buttonVariants } from "@/components/ui/button"
import CONFIG from "@/config"
import { currencyFormat, getTotales } from "@/lib/mappers"
import { useWatch } from "react-hook-form"
import { Typology } from "@/types/room"

const Summary = ({ selectedRoom, isPending }: { selectedRoom: Typology | null, isPending: boolean }) => {
    

    const airportPickup = useWatch({ name: 'airportPickup' })
    const petFee = useWatch({ name: 'petFee' })


    const adults = parseInt(selectedRoom?.search?.adults || '2')
    const children = parseInt(selectedRoom?.search?.children || '0')
    const guests = adults + children
    

    const { subtotal, depositTotal, airportPickupFee, petFeeAmount } = getTotales({
        airportPickup,
        petFee,
        totalPrice: selectedRoom?.priceInUsd || 0
    })

    return (
        <div className="rounded-lg bg-foreground text-white overflow-hidden">
            <picture className="relative">
                <img className="w-full h-[300px] object-cover" src={`${CONFIG.IMAGE_CDN_BASE_URL}/${selectedRoom?.photos[0]}`} alt="" />
                <figcaption className="absolute inset-0 bg-gradient-to-b from-black/2 to-foreground p-4 w-full h-full flex flex-col justify-end">
                    <h3 className="text-base font-semibold">MEDELLIN - EL POBLADO</h3>
                    <p className="text-xs ">{selectedRoom?.name}</p>
                </figcaption>
            </picture>
            <div className="px-6 pt-6 pb-10">
                <div className="border-y border-white/20 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs tracking-wide ">Check-in</p>
                            <p className="text-sm font-medium">{selectedRoom?.search?.checkIn}</p>
                        </div>
                        <div>
                            <p className="text-xs tracking-wide ">Check-out</p>
                            <p className="text-sm font-medium">{selectedRoom?.search?.checkOut}</p>
                        </div>
                    </div>
                </div>
                <div className="py-6 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-xs ">{selectedRoom?.nights} nights x {guests} guest</span>
                        <span className="font-medium text-sm">{currencyFormat(selectedRoom?.priceInUsd ?? 0)} USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-xs ">Pet fee</span>
                        <span className="font-medium text-sm">{currencyFormat(petFeeAmount)} USD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-xs ">Airport pickup</span>
                        <span className="font-medium text-sm">{currencyFormat(airportPickupFee)} USD</span>
                    </div>

                    <div className="border-t border-white/20 py-6">
                        <div className="flex justify-between">
                            <span className="font-semibold ">TOTAL</span>
                            <span className="font-bold">{currencyFormat(subtotal)} USD</span>
                        </div>
                    </div>
                    <div className="border-t border-white/20 py-6">
                        <div className="flex justify-between">
                            <span className="font-semibold ">DEPOSIT (50%)</span>
                            <span className="font-bold">{currencyFormat(depositTotal)} USD</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <Button disabled={isPending} size="xl" variant="light" type="submit" className="w-full hover:brightness-110 cursor-pointer">
                        {isPending ? "PROCESSING..." : "BOOK NOW"}
                    </Button>
                    <a href="https://api.whatsapp.com/send?phone=573232230942&text=Hello%0AI%27m%20coming%20from%20the%20website" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "xl", variant: "outline-brand", className: "w-full" })}>
                        CONTACT ADMIN
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Summary