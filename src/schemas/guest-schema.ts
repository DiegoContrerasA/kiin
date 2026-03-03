import { z } from "zod"

export const GuestSchema = z.object({
    name: z.string().min(2, "Name is required."),
    lastName: z.string().min(2, "Last name is required."),
    documentType: z.string().min(1, "Document type is required."),
    documentNumber: z.string().min(2, "Document number is required."),
    gender: z.string().min(1, "Gender is required."),
    email: z.email("Invalid email, please enter a valid email.").min(1, "Email is required."),
    phone: z.string().min(10, "Phone number is required."),
    nationality: z.string().min(2, "Nationality is required."),
    socialMediaProfile: z.string().optional(),
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