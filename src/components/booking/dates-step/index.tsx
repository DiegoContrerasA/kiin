import DatesForm from "./dates-form"

const DateStep = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold">Select your stay</h2>
                <p className="text-muted-foreground max-w-xl">
                    Choose your preferred dates and number of guests to find the perfect getaway in our curated selection of properties.
                </p>
            </div>
        <DatesForm/>
        </section>
    )

}


export default DateStep