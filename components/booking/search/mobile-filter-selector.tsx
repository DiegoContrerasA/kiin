"use client"


import { CalendarIcon, Search, UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer"
import { format } from "date-fns"
import { useFilters } from "@/hooks/use-filters"
import { useState } from "react"
import Guests from "./guests"
import { MobileRangeCalendar } from "@/components/ui/mobile-calendar"
import { DateRange } from "react-day-picker"


enum FilterType {
  DATES = "DATES",
  GUESTS = "GUESTS",
}

export default function MobileFilterSelector() {

  const { date, adults, children, onSearch, disabled, setAdults, setChildren, setDate } = useFilters()

  const [currentDrawer, setCurrentDrawer] = useState<FilterType | null>(null)

  const onSetCurrentDrawer = (drawer: FilterType | null) => () => {
    setCurrentDrawer(drawer)
  }

  const onHandleDateSelect = (range: { from?: Date; to?: Date }) => {
    setDate(range as DateRange)
  }

  return (
    <>
      <div className="flex flex-col p-4 gap-2 bg-white rounded-lg md:hidden">
        <Button
          variant="ghost"
          id="date-range"
          onClick={onSetCurrentDrawer(FilterType.DATES)}
          type="button"
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
        <span className="h-0.5 w-full space-y-1 bg-muted" />
        <Button
          variant="ghost"
          id="guests"
          type="button"
          onClick={onSetCurrentDrawer(FilterType.GUESTS)}
          className="items-start justify-start flex-col px-4 py-2 font-normal rounded-lg h-auto"
        >
          <label htmlFor="guests" className='text-xs font-semibold'>Guests</label>
          <span className="flex items-center gap-2 text-muted-foreground">
            <UsersRound />
            <span className="w-[1ch] text-center">{adults}</span> adults, <span className="w-[1ch] text-center">{children}</span> children
          </span>

        </Button>
        <span className="h-0.5 w-full space-y-1 bg-muted" />
        <Button onClick={onSearch} className="rounded-lg" size='xl' variant="brand" disabled={disabled}>
          <Search /> SEARCH
        </Button>
      </div>
      <Drawer open={currentDrawer === FilterType.DATES} onOpenChange={(open) => setCurrentDrawer(open ? FilterType.DATES : null)}>
        <DrawerContent className="h-[85vh] pb-4">
          <DrawerTitle className="sr-only">Filter</DrawerTitle>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <MobileRangeCalendar selected={date} onSelect={onHandleDateSelect} />
            </div>
            <div className="border-t bg-background">
              <Button onClick={() => setCurrentDrawer(null)} className="w-full my-4" size="xl" variant="brand">
                Confirmar
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer open={currentDrawer === FilterType.GUESTS} onOpenChange={(open) => setCurrentDrawer(open ? FilterType.GUESTS : null)}>
        <DrawerContent>
          <DrawerTitle className="sr-only">Guest</DrawerTitle>
          <div className="flex flex-col gap-4 px-4 py-8">
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
        </DrawerContent>
      </Drawer>
    </>

  )
}
