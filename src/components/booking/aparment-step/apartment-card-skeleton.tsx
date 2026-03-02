const ApartmentCardSkeleton = () => {
    return (
        <article className="flex flex-col gap-4 animate-pulse">
            <div className="relative overflow-hidden rounded-lg">
                <div className="w-full h-[300px] bg-card"></div>
            </div>
            <div className="space-y-2">
                <div className="h-6 bg-card rounded w-3/4"></div>
                <div className="space-y-1">
                    <div className="h-4 bg-card rounded w-full"></div>
                    <div className="h-4 bg-card rounded w-full"></div>
                    <div className="h-4 bg-card rounded w-2/3"></div>
                </div>
            </div>
            <div className="h-12 bg-card rounded-lg"></div>
        </article>
    )
}

export default ApartmentCardSkeleton
