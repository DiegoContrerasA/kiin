import EmptyStateIcon from "@/components/icons/empty-state"

const EmptySearch = () => {
    return (
        <div className="flex flex-col w-full items-center my-10 mx-auto max-w-[400px]">
            <EmptyStateIcon className="w-[300px] h-[300px]" />
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-2">  Ready for your next <span className="italic text-[#824c2f]">deep focus</span> stay ?</h2>
            <p className="text-center text-base">Escape the noise. Find sanctuary in our curated collection of essentialist spaces designed for clarity and presence.</p>
        </div>
    )
}

export default EmptySearch