import CONFIG from "@/config"

export const currencyFormat = (price?: number) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price)
}


export const getTotales = (airportPickup: boolean, petFee: boolean, totalPrice: number) => {
   const airportPickupFee = airportPickup ? CONFIG.AIPOR_FEE : 0
    const petFeeAmount = petFee ? CONFIG.PET_FEE : 0
    const additionalFees = airportPickupFee + petFeeAmount
    const subtotal = (totalPrice ?? 0) + additionalFees
    const depositTotal = Math.round(subtotal / 2)
    return { depositTotal, subtotal, additionalFees,petFeeAmount, airportPickupFee}
}