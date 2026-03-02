
import DateStep from "./components/booking/dates-step"
import AppLayout from "./layouts/app-layout"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    },
  },
})
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <DateStep />
      </AppLayout>
    </QueryClientProvider>
  )
}

export default App
