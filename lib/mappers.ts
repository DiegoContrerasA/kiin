export const currencyFormat = (price?: number) => {
    if (!price) return '$0.00'
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price)
}