import DateSelector from "@/components/booking/search/filter-selector";
import MobileFilterSelector from "@/components/booking/search/mobile-filter-selector";
import { Suspense } from "react";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Suspense>
                <DateSelector />
                <MobileFilterSelector />
            </Suspense>
            {children}
        </>
    );
};

export default BookingLayout;