import { useQuery } from '@tanstack/react-query'
import { getTRM } from '@/services/get-trm.service'

export const useTRM = () => {
    return useQuery({
        queryKey: ['trm'],
        queryFn: getTRM,
        staleTime: 60 * 60 * 1000, // 1 hour - TRM doesn't change frequently
        gcTime: 60 * 60 * 1000, // 1 hour - keep in cache for 1 hour
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}
