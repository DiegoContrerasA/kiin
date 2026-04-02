import { addMonths, startOfMonth, format, isSameDay, isWithinInterval, isBefore, endOfMonth, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface MobileRangeCalendarProps {
  selected?: { from?: Date; to?: Date };
  onSelect: (range: { from?: Date; to?: Date }) => void;
  locale?: object;
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = endOfMonth(firstDay);
  const startDay = getDay(firstDay); // 0=Sun
  const days: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function MobileRangeCalendar({ selected, onSelect }: MobileRangeCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const months = useMemo(() => {
    const start = startOfMonth(today);
    return Array.from({ length: 12 }, (_, i) => addMonths(start, i));
  }, [today]);

  const handleDayClick = (day: Date) => {
    if (!selected?.from || (selected.from && selected.to)) {
      onSelect({ from: day, to: undefined });
    } else {
      if (isBefore(day, selected.from)) {
        onSelect({ from: day, to: selected.from });
      } else {
        onSelect({ from: selected.from, to: day });
      }
    }
  };

  const isRangeStart = (day: Date) => selected?.from && isSameDay(day, selected.from);
  const isRangeEnd = (day: Date) => selected?.to && isSameDay(day, selected.to);
  const isInRange = (day: Date) => {
    if (!selected?.from || !selected?.to) return false;
    return isWithinInterval(day, { start: selected.from, end: selected.to });
  };

  return (
      <div className="flex flex-col h-full overflow-y-auto px-4">
        {months.map((monthDate) => {
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const days = getMonthDays(year, month);
          const label = format(monthDate, "MMMM yyyy", { locale: es });

          return (
            <div key={label} className="mt-6">
              <h3 className="text-base font-bold text-foreground mb-3 capitalize">{label}</h3>
              <div className="grid grid-cols-7 gap-y-1">
                {days.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;

                  const rangeStart = isRangeStart(day);
                  const rangeEnd = isRangeEnd(day);
                  const inRange = isInRange(day);
                  const isToday = isSameDay(day, today);

                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        "relative flex items-center justify-center",
                        // Range background spanning full cell
                        inRange && !rangeStart && !rangeEnd && "bg-accent",
                        rangeStart && "bg-gradient-to-r from-transparent to-accent rounded-l-none",
                        rangeEnd && "bg-gradient-to-l from-transparent to-accent rounded-r-none",
                        rangeStart && rangeEnd && "bg-transparent",
                      )}
                    >
                      <button
                        onClick={() => handleDayClick(day)}
                        className={cn(
                          "h-10 w-10 rounded-lg text-sm font-normal transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          isToday && !rangeStart && !rangeEnd && "bg-muted text-foreground font-semibold",
                          (rangeStart || rangeEnd) && "bg-brand text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                          inRange && !rangeStart && !rangeEnd && "text-accent-foreground",
                        )}
                      >
                        {day.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
  );
}