
"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Search, UsersRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import Guests from "./guests";

const FilterSelector = () => {

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



  const onSearch = () => {
    if (!date?.from || !date?.to) return
    const query = `?checkIn=${format(date.from, "yyyy-MM-dd")}&checkOut=${format(date.to, "yyyy-MM-dd")}&adults=${adults}&children=${children}`
    router.push(query)
    router.refresh()
  }

  const disabled = !date?.from || !date?.to

  return (
    <div className="w-full max-w-4xl p-2 shadow-2xs mx-auto items-center gap-4 bg-white rounded-lg hidden md:flex">
      <Field className="w-full">
        <Popover>
          <PopoverTrigger asChild className="flex flex-col">

            <Button
              variant="ghost"
              id="date-range"
              className="items-start px-4 flex-col gap-1 font-normal py-2 h-auto rounded-lg"
            >
              <label htmlFor="date-range" className='text-xs font-semibold'>Dates</label>
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} to {" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Select your dates</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto rounded-2xl" align="start" sideOffset={15}>
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="w-full"
              classNames={{
                day: "h-10 w-10 text-base",
                range_start: "[&>button]:!bg-brand [&>button]:!rounded-lg",
                range_end: "[&>button]:!bg-brand [&>button]:!rounded-lg",
                range_middle: "[&>button]:!bg-brand/10",
                today: " [&>button]:!bg-brand/10 [&>button]:!rounded-lg",
              }}

            />
          </PopoverContent>
        </Popover>
      </Field>
      <span className="h-10 w-0.5 bg-muted" />
      <Field className="w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              id="guests"
              className="items-start justify-start flex-col px-4 py-2 font-normal rounded-lg h-auto"
            >
              <label htmlFor="guests" className='text-xs font-semibold'>Guests</label>
              <span className="flex items-center gap-2 text-muted-foreground">
                <UsersRound />
                <span className="w-[1ch] text-center">{adults}</span> adults, <span className="w-[1ch] text-center">{children}</span> children
              </span>

            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto rounded-2xl" sideOffset={15} align="start">
            <div className="flex flex-col gap-4 p-2">
              <Guests
                value={adults}
                setValue={setAdults}
                title="Adultos"
                subtitle="Edad: 15 años o más" />
              <span className="border-b" />
              <Guests
                value={children}
                setValue={setChildren}
                title="Niños"
                subtitle="Edades 2 - 14" />
            </div>
          </PopoverContent>
        </Popover>
      </Field>
      <Button onClick={onSearch} className="rounded-lg w-12" size='xl' variant="brand" disabled={disabled}>
        <Search />
      </Button>
    </div>
  );
};

export default FilterSelector;