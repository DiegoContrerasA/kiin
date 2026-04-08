import Link from "next/link"

const NotFound = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center  px-6 text-center">
      <div className="relative mb-8 flex h-48 items-center justify-center sm:h-64">
        <span className="absolute text-[10rem] font-bold text-brand/5 select-none sm:text-[16rem]">
          404
        </span>
        <span className="relative text-5xl font-light tracking-wider text-brand sm:text-6xl">
          404
        </span>
      </div>

      <h1 className="mt-8 text-2xl font-light text-foreground/85 sm:text-3xl">
        The page you are looking for has
        <br />
        wandered off.
      </h1>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        Lets get you back to finding your next quiet space. Sometimes
        the best discoveries happen when we take a step back.
      </p>

      <Link
        href="/"
        className="mt-10 inline-block rounded-md bg-brand px-8 py-3 text-xs font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-80"
      >
        Back to Home
      </Link>
    </div>
    )
}

export default NotFound