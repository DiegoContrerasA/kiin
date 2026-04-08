import Disclaimer from "@/components/booking/search/disclaimer";
import DateSelector from "@/components/booking/search/filter-selector";
import MobileFilterSelector from "@/components/booking/search/mobile-filter-selector";
import { Suspense } from "react";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="w-full flex flex-col justify-center gap-5 mb-12">
                <Suspense fallback={<div className="w-full max-w-4xl mx-auto bg-white rounded-xl h-[240px] md:h-[76px] animate-pulse" />}>
                    <DateSelector />
                    <MobileFilterSelector />
                </Suspense>
                <Disclaimer />
            </div>
            {children}
        </>
    );
};

export default BookingLayout;