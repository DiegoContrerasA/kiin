
"use client"
import { useFilters } from "@/hooks/use-filters";
import MobileFilterSelector from "./mobile-filter-selector";
import WebFilterSelector from "./web-filter-selector";

const FilterSelector = () => {

  const { date, setDate, adults, setAdults, children, setChildren, onSearch, disabled } = useFilters()

  return (
   <>
   <MobileFilterSelector 
   date={date}
   setDate={setDate}
   adults={adults}
   setAdults={setAdults}
   children={children}
   setChildren={setChildren}
   onSearch={onSearch}
   disabled={disabled}
   />
   <WebFilterSelector
   date={date}
   setDate={setDate}
   adults={adults}
   setAdults={setAdults}
   children={children}
   setChildren={setChildren}
   onSearch={onSearch}
   disabled={disabled}
   />
   </>
  );
};

export default FilterSelector;