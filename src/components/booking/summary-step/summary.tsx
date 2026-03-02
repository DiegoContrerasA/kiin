import { Button } from "@/components/ui/button"

const Summary = () => {
    return (
        <section className="bg-foreground text-white/80">
            <picture className="relative">
                <img className="w-full h-[300px] object-cover" src="https://cdn.kiinliving.com/images/lg/202511053352.jpg" alt="" />
                <figcaption className="absolute inset-0 bg-gradient-to-b from-black/2 to-foreground p-4 w-full h-full flex flex-col justify-end">
                    <h3 className="text-base font-semibold">MEDELLIN - EL POBLADO</h3>
                    <p className="text-xs text-white/60">PRIVATE QUEEN WITH INTERIOR WINDOW</p>
                </figcaption>
            </picture>
            <div className="px-6 pt-6 pb-10">
                <div className="border-y border-white/20 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs tracking-wide text-white/60">Check-in</p>
                            <p className="text-sm font-medium">Feb 19, 2026</p>
                        </div>
                        <div>
                            <p className="text-xs tracking-wide text-white/60">Check-out</p>
                            <p className="text-sm font-medium">Feb 28, 2026</p>
                        </div>
                    </div>
                </div>
                 <div className="py-6 flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-xs text-white/60">9 nights x 1 guest</span>
                        <span className="font-medium text-sm">$512.10 USD</span>
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
                    <Button size="xl" variant="default" className="w-full hover:brightness-110">
                        BOOK NOW
                    </Button>
                    <Button size="xl" variant="outline" className="w-full">
                        CONTACT ADMIN
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Summary