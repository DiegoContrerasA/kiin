import { Button } from "@/components/ui/button"
import { currencyFormat } from "@/lib/mappers"
import { cn } from "@/lib/utils"

interface AddonProps {
    value: boolean
    setValue: () => void
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    price: number
}

const Addon = ({
    value,
    setValue,
    icon: Icon,
    title,
    description,
    price
}: AddonProps) => {
    return (
        <div className={cn("flex items-center justify-between p-4 bg-white  gap-4 border rounded-lg", value && "!border-brand")}>
            <div className='flex gap-3 items-center'>
                <Icon className='size-10 min-w-10' />
                <div>
                    <h4 className="font-medium">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <strong className='text-primary'>{currencyFormat(price)}</strong> USD
                </div>
            </div>
            <Button
                type="button"
                variant={value ? "brand" : "outline"}
                size="xl"
                onClick={setValue}
                className="min-w-[100px]"
            >
                {value ? "Remove" : "Add"}
            </Button>
        </div>
    )
}

export default Addon