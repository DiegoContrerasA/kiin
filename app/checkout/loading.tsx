import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section className="w-full max-w-7xl mx-auto">      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full bg-brand/10" />
          <Skeleton className="h-12 w-full bg-brand/10" />
          <Skeleton className="h-12 w-full bg-brand/10" />
          <Skeleton className="h-12 w-full bg-brand/10" />
          <Skeleton className="h-12 w-full bg-brand/10" />
          <Skeleton className="h-40 w-full bg-brand/10" />
          <Skeleton className="h-12 w-40 bg-brand/10" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-xl bg-brand/10" />
          <Skeleton className="h-12 w-full bg-brand/10" />
        </div>
      </div>
    </section>
  )
}

export default Loading
