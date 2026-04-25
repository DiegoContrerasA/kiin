'use client'

import { usePurchaseTracking } from '@/hooks/use-purchase-tracking'

interface PurchaseTrackerProps {
  status: string
  deposit: number
  roomName?: string
  roomPrice?: number
  nights?: number
}

const PurchaseTracker = ({ status, deposit, roomName, roomPrice, nights }: PurchaseTrackerProps) => {
  usePurchaseTracking({ status, deposit, roomName, roomPrice, nights })
  
  // This component doesn't render anything, it just handles the GTM tracking
  return null
}

export default PurchaseTracker
