import { cn } from "@/lib/utils"
import { SVGProps } from "react"
const EmptyStateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 200 200"
    className={cn("w-full h-full relative z-10", props.className)}
    {...props}
  >
    <path fill="#F3ECEA" d="M40 140V70l60-35 60 35v70H40Z" />
    <path fill="#E8E1DD" d="m100 35 60 35-60 35-60-35 60-35Z" />
    <path fill="#88512F" d="M85 110h30v30H85z" opacity={0.1} />
    <path stroke="#B7B1AD" strokeWidth={0.5} d="m40 70 60 35 60-35" />
    <circle cx={165} cy={120} r={15} fill="#88512F" opacity={0.15} />
    <path fill="#88512F" d="M164 135h2v15h-2z" opacity={0.2} />
    <circle cx={50} cy={50} r={4} fill="#88512F" />
    <path
      stroke="#88512F"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m170 40 8 8m0-8-8 8"
    />
    <circle
      cx={30}
      cy={110}
      r={10}
      stroke="#B7B1AD"
      strokeDasharray="4 2"
      strokeWidth={0.5}
    />
    <path stroke="#B7B1AD" strokeLinecap="round" d="M20 140h160" />
  </svg>
)
export default EmptyStateIcon
