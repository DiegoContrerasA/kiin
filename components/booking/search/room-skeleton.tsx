const SkeletonCard = () => {
  return (
    <div className="bg-brand/5 rounded-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[300px] bg-brand/10" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-brand/10 rounded w-3/4 mb-2" />
        
        {/* Description skeleton lines */}
        <div className="space-y-2">
          <div className="h-3 bg-brand/10 rounded" />
          <div className="h-3 bg-brand/10 rounded w-5/6" />
        </div>
        
        {/* Features skeleton */}
        <div className="flex justify-between gap-3 mt-4">
          <div className="flex gap-3">
            <div className="h-4 w-4 bg-brand/10 rounded-full" />
            <div className="h-4 w-4 bg-brand/10 rounded-full" />
          </div>
          <div className="h-8 bg-brand/10 rounded w-20" />
        </div>
        
        {/* Button skeleton */}
        <div className="mt-4 h-10 bg-brand/10 rounded" />
      </div>
    </div>
  )
}


export default function RoomSkeleton() {
  return <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </section>
}
