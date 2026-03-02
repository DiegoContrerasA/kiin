import { addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const DateStep = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(new Date().getFullYear(), 0, 12),
        to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    })

    return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold">Select your stay</h2>
                <p className="text-muted-foreground max-w-xl">
                    Choose your preferred dates and number of guests to find the perfect getaway in our curated selection of properties.
                </p>
            </div>

            <div className="p-10 my-10  w-full max-w-5xl flex flex-col gap-10  shadow-[0_10px_40px_8px_rgba(0,0,0,0.05)]">
                <Calendar
                    mode="range"
                    className="w-full sm:w-[95%] mx-auto"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    classNames={{
                        caption_label: "text-base",
                        
                    }}
                />
                            <hr className="w-full border-1 border-muted" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-start gap-1">
                             <p className="text-foreground">Check-in</p>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-primary" />
                                <span className="text-sm text-muted-foreground">12 Jan 2025</span>
                            </div>
                            
                        </div>
                        <div className="flex flex-col items-start gap-1">
                             <p className="text-foreground">Check-out</p>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="size-4 text-primary" />
                                <span className="text-sm text-muted-foreground">12 Jan 2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select>
                            <SelectTrigger className="!h-12 w-full">
                                <SelectValue placeholder="Select a guest" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 guest</SelectItem>
                                <SelectItem value="2">2 guests</SelectItem>
                                <SelectItem value="3">3 guests</SelectItem>
                                <SelectItem value="4">4 guests</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size="xl">Search</Button>

                    </div>

                </div>

            </div>
        </section>
    )

}


export default DateStep