import AparmentLists from "./aparment-lists"

const AparmentStep = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold">Select Your Apartment</h2>
                <p className="text-muted-foreground max-w-md">
                    Find the perfect sanctuary for your stay in the city. Each space is curated for comfort and inspiration.
                </p>
            </div>

            <div className="p-10 my-10 w-full max-w-5xl">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AparmentLists />
                </section>
            </div>
        </section>
    )
}

export default AparmentStep