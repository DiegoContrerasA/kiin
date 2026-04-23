import CONFIG from "@/config"

export const currencyFormat = (price?: number) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price)
}

export const formatColombianPesos = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return 'TBD';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'TBD';
  
  return dateObj.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};


export const calculateTotals = ({
    withTransfer,
    withPet,
    roomPrice
}: {
    withTransfer: boolean,
    withPet: boolean,
    roomPrice: number
}) => {
   const tranferFee = withTransfer ? CONFIG.TRANSFER_FEE : 0
    const petFee = withPet ? CONFIG.PET_FEE : 0
    const additionalFees = tranferFee + petFee
    const total = (roomPrice ?? 0) + additionalFees
    const deposit = Math.round(total / 2)
    return { deposit, total, additionalFees }
}