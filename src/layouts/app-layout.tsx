
import BookingStepper from "@/components/booking/booking-stepper";
import KiinLogo from "../assets/kiin-logo.png";
import FacebookIcon from "../assets/icons/facebook";
import InstagramIcon from "../assets/icons/instagram";
import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh">
            <header className="flex justify-center p-5">
                <img className="w-16" src={KiinLogo} alt="Kiin Logo" />
            </header>
            <main className="flex-1 border-y border-border px-5 py-10">
                <BookingStepper className="mb-12" />
                <Outlet />
            </main>
            <footer className="px-5 py-10 flex flex-col items-center bg-foreground gap-4 text-white/50">
                <img className="w-16 brightness-0 invert" src={KiinLogo} alt="Kiin Logo" />
                <p className=" text-xs max-w-5xl text-center text-balance">
                    In development of the provisions of Article 17 of Law 679 of 2001,
                    STAY SAS, operator of the brand Kiin Living, warns that the exploitation and sexual
                    abuse of children and adolescents in the country are criminally sanctioned, in accordance with current laws.
                </p>
                <nav className="flex items-center gap-2">
                    <a href="https://www.facebook.com/KiinLife/" target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Facebook</span>
                        <FacebookIcon className="size-6 hover:text-white transition-colors" />
                    </a>
                    <a href="https://www.instagram.com/kiin.living/" target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Instagram</span>
                        <InstagramIcon className="size-6 hover:text-white transition-colors" />
                    </a>
                </nav>
            </footer>
        </div>
    )
}

export default AppLayout