import EmptyStateIcon from "@/components/icons/empty-state"

const NoResults = () => {
    return (
        <div className="flex flex-col w-full items-center mx-auto max-w-[400px]">
            <EmptyStateIcon className="w-[300px] h-[300px]" />
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-2">No spaces found for these dates</h2>
            <p className="text-center text-base">It seems the Isle of Skye is resting during your selected dates.
                Try adjusting your calendar or exploring nearby coastal havens.</p>
        </div>
    )
}

export default NoResults