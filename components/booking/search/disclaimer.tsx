import { Lightbulb } from "lucide-react"

const Disclaimer = () => {
  return (
    <div className="space-y-2 w-full max-w-2xl mx-auto" >
      <div className=" border bg-brand/5  rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="bg-brand/10 flex p-2 rounded-md">
            <Lightbulb className="w-5 h-5  shrink-0 mt-0.5" />
          </span>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm">
              Did you know?
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Stays of 20+ days get a significantly lower rate. Consider extending your stay for the best value and a truly immersive experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
