import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const UserSchema = z.object({
    name: z.string().min(2, "Name is required."),
    lastName: z.string().min(2, "Last name is required."),
    documentType: z.string().min(1, "Document type is required."),
    documentNumber: z.string().min(2, "Document number is required."),
    gender: z.string().min(1, "Gender is required."),
    email: z.email("Invalid email, please enter a valid email.").min(1, "Email is required."),
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    nationality: z.string().min(2, "Nationality is required."),
    country:z.string().min(2, "Country is required."),
    socialMediaProfile: z.string().optional(),
    withTransfer: z.boolean().default(false),
    withPet: z.boolean().default(false),
})

export const defaultUserSchema = {
    name: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    gender: "",
    email: "",
    phone: "",
    nationality: "",
    country: "",
    socialMediaProfile: "",
    withTransfer: false,
    withPet: false,
}

export type UserSchemaValues = z.infer<typeof UserSchema>