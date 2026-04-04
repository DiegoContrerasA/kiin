import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import FacebookIcon from "@/components/icons/facebook";
import InstagramIcon from "@/components/icons/instagram";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Reservations - Kiin Living - Coliving Medellín",
  description: "Reserva tu espacio en Kiin Living, el mejor coliving en Medellín",
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: "https://kiinliving.com/reservations/"
  },
  icons: {
    icon: "/icon-192x192.webp",
  },
  openGraph: {
    locale: "es_ES",
    type: "article",
    title: "Reservations - Kiin Living - Coliving Medellín",
    url: "https://kiinliving.com/reservations/",
    siteName: "Kiin Living - Coliving Medellín",
    publishedTime: "2025-10-22T19:46:57-05:00",
    modifiedTime: "2025-11-28T14:20:24-05:00"
  },
  twitter: {
    card: "summary_large_image",
    title: "Reservations - Kiin Living - Coliving Medellín",
    site: "@KiinLivingCO",
    creator: "@KiinLivingCO"
  },
  authors: [
    { name: "Juan Felipe Alvarez" }
  ],
  other: {
    "twitter:label1": "Time to read",
    "twitter:data1": "Less than a minute"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="flex justify-center p-4">
          <Image src="/kiin-logo.png" alt="Kiin Logo" width={36} height={36} className="brightness-0" />
        </header>
        <main className="flex-1 border-y border-border px-5 md:px-8 pt-10 pb-20">
           <ToastContainer position="top-center" theme="colored" />
          {children}
        </main>
        <footer className="px-5 py-10 flex flex-col items-center bg-foreground gap-4 text-white/50">
          <img className="w-16 brightness-0 invert" src="/kiin-logo.png" alt="Kiin Logo" />
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
      </body>
    </html>
  );
}
