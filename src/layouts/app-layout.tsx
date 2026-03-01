
import KiinLogo from "../assets/kiin-logo.png";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-dvh">
            <header className="flex justify-center p-5">
                <img className="w-16" src={KiinLogo} alt="Kiin Logo" />
            </header>
            <main className="flex-1 border-y border-border px-5 py-10">
                {children}
            </main>
            <footer className="px-5 py-10 flex flex-col items-center bg-foreground">
                <p className="text-white text-sm">
                    Need help ? Contact us at{" "}
                    <a className="hover:underline duration-200 transition-colors" 
                    href="https://api.whatsapp.com/send/?phone=573144718720&text&type=phone_number&app_absenta0">+57 314 471 8720</a>
                </p>
            </footer>
        </div>
    )
}

export default AppLayout