import GoBack from "@/components/booking/checkout/go-back"

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
 return <section className="w-full max-w-7xl mx-auto">
       <GoBack />
       <h2 className="text-3xl md:text-4xl font-bold mb-10">Confirm and Payment</h2>
       {children}
     </section>
}

export default CheckoutLayout