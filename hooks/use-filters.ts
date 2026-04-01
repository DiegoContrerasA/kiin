import { differenceInDays, format, parseISO } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { DateRange } from "react-day-picker"
import { toast } from "react-toastify"

export const useFilters = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const [date, setDate] = useState<DateRange | undefined>(() => {
        const checkInParam = searchParams.get('checkIn')
        const checkOutParam = searchParams.get('checkOut')
        if (checkInParam && checkOutParam) {
            return {
                from: parseISO(checkInParam),
                to: parseISO(checkOutParam),
            }
        }
        return {
            from: undefined,
            to: undefined,
        }
    })

    const [adults, setAdults] = useState(() => {
        const adultsParam = searchParams.get('adults')
        return adultsParam ? parseInt(adultsParam) : 1
    })
    const [children, setChildren] = useState(() => {
        const childrenParam = searchParams.get('children')
        return childrenParam ? parseInt(childrenParam) : 0
    })


    const onSearch = useCallback(() => {
        if (!date?.from || !date?.to) return

        const nights = differenceInDays(date.to, date.from)
        if (nights < 7) {
            toast.error("Minimum stay is 7 nights")
            return
        }

        const query = `?checkIn=${format(date.from, "yyyy-MM-dd")}&checkOut=${format(date.to, "yyyy-MM-dd")}&adults=${adults}&children=${children}`
        router.push(query, { scroll: true })
    }, [date, adults, children, router])

    const disabled = !date?.from || !date?.to

    return {
        date,
        setDate,
        adults,
        setAdults,
        children,
        setChildren,
        onSearch,
        disabled,
    }
}   