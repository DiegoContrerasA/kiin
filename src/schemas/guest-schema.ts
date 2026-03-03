import { z } from "zod"

export const GuestSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    documentType: z.string(),
    documentNumber: z.string().min(2, "Document number must be at least 2 characters long"),
    gender: z.string(),
    email: z.email("Invalid email"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    nationality: z.string().min(2, "Nationality must be at least 2 characters long"),
    socialMediaProfile: z.string().url("Invalid URL"),
})

export const defaultGuestSchema = {
    name: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    gender: "",
    email: "",
    phone: "",
    nationality: "",
    socialMediaProfile: "",
}

export type GuestSchemaValues = z.infer<typeof GuestSchema>