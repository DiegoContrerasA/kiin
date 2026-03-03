
import AppLayout from "./layouts/app-layout"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import BookingProvider from "./provider/booking-provider"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { ToastContainer } from 'react-toastify';
import DateStep from "./components/booking/dates-step"
import AparmentStep from "./components/booking/aparment-step"
import SummaryStep from "./components/booking/summary-step"

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
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DateStep />} />
              <Route path="apartments" element={<AparmentStep />} />
              <Route path="summary" element={<SummaryStep />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" theme="colored" />
      </BookingProvider>
    </QueryClientProvider>
  )
}

export default App
