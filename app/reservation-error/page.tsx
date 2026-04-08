import {  MessageCircle } from "lucide-react";
import Link from "next/link";

const FailedPage = () => {
  return  <div className="flex  h-full flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8 flex h-48 items-center justify-center sm:h-64">
        <span className="absolute text-[10rem] font-bold text-brand/5 select-none sm:text-[16rem]">
          !
        </span>
        <span className="relative text-5xl font-light tracking-wider text-brand sm:text-6xl">
          Oops
        </span>
      </div>

      <h1
        className="mt-8 text-2xl font-light text-foreground/85 sm:text-3xl"
      >
       “We encountered a problem while processing your reservation.”
      </h1>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
       “We’re sorry, something went wrong. Please contact us so we can help you complete your reservation as soon as possible.”
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href='https://api.whatsapp.com/send?phone=573232230942&text=Hello%0AI%27m%20coming%20from%20the%20website'
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-brand px-8 py-3 text-xs font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-80"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>

      <Link
        href="/"
        className="mt-8 text-xs underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        Go to home
      </Link>
    </div>
};

export default FailedPage;