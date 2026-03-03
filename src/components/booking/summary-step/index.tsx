
import GuestForm from "./guest-form"

const SummaryStep = () => {
    return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold">Guest Details</h2>
                <p className="text-muted-foreground max-w-xl">
                    Please complete the guest information below so we can confirm your booking and ensure a smooth check-in experience.  </p>
            </div>
            <div className="p-10 my-10 w-full max-w-5xl">
                <GuestForm />
            </div>
        </section>
    )
}

export default SummaryStep