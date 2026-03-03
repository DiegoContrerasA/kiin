import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GUEST_OPTIONS } from "@/config/select-lists"
import { Calendar } from "@/components/ui/calendar"
import { ArrowRight, CalendarDays } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { differenceInDays, isSameDay } from "date-fns"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useBooking } from "@/provider/booking-provider"
import { formatDate } from "@/lib/dates"


const DatesForm = () => {

    const { roomSearchParams, setRoomSearchParams } = useBooking()
    const [range, setRange] = useState<DateRange | undefined>(() => roomSearchParams.range)
    const [guests, setGuests] = useState<string>(() => roomSearchParams.guests || "2")

    const navigate = useNavigate()

    const onChangeGuests = (value: string) => {
        setGuests(value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!range?.from || !range?.to) return

        const nights = differenceInDays(range.to, range.from)

        if (nights < 7) {
            toast.error("Minimum stay is 7 nights", {
                autoClose: 5000,
            })
            return
        }

        setRoomSearchParams({ range, guests })
        navigate(`/apartments?checkIn=${formatDate(range.from)}&checkOut=${formatDate(range.to)}&guests=${guests}`)
    }

    const disabledButton = !range?.from || !range?.to || isSameDay(range?.from, range?.to)

    return (
        <form onSubmit={onSubmit} className="p-10 my-10  w-full max-w-5xl flex flex-col gap-10  shadow-[0_10px_40px_8px_rgba(0,0,0,0.05)]">
            <Calendar
                mode="range"
                className="w-full sm:w-[95%] mx-auto"
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
                disabled={(date) =>
                    date < new Date()
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
                            <span className="text-sm text-muted-foreground">{formatDate(range?.from, "LLL dd, y")}</span>
                        </div>

                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-foreground">Check-out</p>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="size-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{formatDate(range?.to, "LLL dd, y")}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        value={guests}
                        onValueChange={onChangeGuests}
                    >
                        <SelectTrigger
                            id="documentType"
                            className="min-w-[120px] !h-12 w-full"
                        >
                            <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            {GUEST_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button size="xl" disabled={disabledButton}>Continue <ArrowRight /></Button>
                </div>
            </div>
        </form>
    )
}

export default DatesForm