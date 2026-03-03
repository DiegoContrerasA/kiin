import { format } from "date-fns"

export const formatDate = (date: Date | undefined, formatString: string = "yyyy-MM-dd") => {
    if(!date) return "--"
    return format(date, formatString)
}