import Disclaimer from "@/components/booking/search/disclaimer";
import DateSelector from "@/components/booking/search/filter-selector";
import MobileFilterSelector from "@/components/booking/search/mobile-filter-selector";
import { Suspense } from "react";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Suspense>
                <div className="w-full flex flex-col justify-center gap-5 mb-12">
                    <DateSelector />
                    <MobileFilterSelector />
                    <Disclaimer />
                </div>
            </Suspense>
            {children}
        </>
    );
};

export default BookingLayout;