import { buttonVariants } from "@/components/ui/button"
import AparmentLists from "./aparment-lists"
import { Link} from 'react-router'
import { ArrowLeft } from "lucide-react"

const AparmentStep = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold">Select Your Apartment</h2>
                <p className="text-muted-foreground max-w-xl">
                    Find the perfect sanctuary for your stay in the city. Each space is curated for comfort and inspiration.
                </p>
            </div>

            <div className="p-10 my-10 w-full max-w-5xl">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AparmentLists />
                </section>
            </div>
            <div>
                <Link to='/' className={buttonVariants({size: 'xl', variant: 'outline', className: 'w-full max-w-2xs'})}>
                   <ArrowLeft /> Go back
                </Link>
            </div>
        </section>
    )
}

export default AparmentStep