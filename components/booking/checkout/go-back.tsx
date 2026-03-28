'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const GoBack = () => {
    const router = useRouter()
    const handleGoBack = () => {
        router.back()
        window.scrollTo(0, 0)
    }
    return (
        <button onClick={handleGoBack} className="text-sm flex items-center gap-2 mb-4">
            <ArrowLeft className="size-4" />
            BACK TO PROPERTY
        </button>
    )
}

export default GoBack