import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router";
import { useEffect } from "react";

const STEPS = ["/", "/apartments", "/summary"];
const STEPS_LABELS = ["Dates", "Apartments", "Summary"];

const BookingStepper = ({className}: {className?: string}) => {
   const {pathname} = useLocation()

   console.log(pathname)

   const step = STEPS.indexOf(pathname)

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }, [pathname])

  return (
    <div className={cn("flex items-center justify-center gap-1 sm:gap-2 px-5", className)}>
      {STEPS_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                  ? "border-2 border-primary text-primary bg-background"
                  : "border border-border text-muted-foreground bg-background"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs font-body hidden sm:block ${
                i <= step ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-4 sm:w-12 h-px transition-colors ${
                i < step ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingStepper;
