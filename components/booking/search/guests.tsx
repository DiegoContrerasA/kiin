import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface GuestsProps {
    value: number
    setValue: (value: number) => void
    title: string
    subtitle: string
}
const Guests = ({ value, setValue, title, subtitle }: GuestsProps) => {
    return (
        <div className="flex items-center justify-between gap-10">
            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => setValue(Math.max(0, value - 1))}>
                    <Minus />
                </Button>
                <span className="w-[1ch] text-center">{value}</span>
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => setValue(Math.min(6, value + 1))}>
                    <Plus />
                </Button>
            </div>
        </div>
    )
}

export default Guests