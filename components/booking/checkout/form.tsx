"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { UserSchema, type UserSchemaValues, defaultUserSchema } from '@/schemas/summary.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Fields from './fields'
import Summary from './summary'

import { useTransition } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { parsePhoneNumber } from 'react-phone-number-input'
import { generatePaymentLink } from '@/actions/generate-payment-link-action'
import { adaptUserSchemaWithPhoneToPmsUser } from '@/adapters/user.adapter'
import { adaptToPmsReservation } from '@/adapters/reservation.adapter'
import { PmsTypology } from '@/types/pms'

const SummaryForm = ({ selectedRoom }: { selectedRoom: PmsTypology| null }) => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm({
        defaultValues: defaultUserSchema,
        resolver: zodResolver(UserSchema)
    })

    const onSubmit = async (data: UserSchemaValues) => {
        if (!selectedRoom) return toast.error('Please check your reservation details')

        const { countryCallingCode, nationalNumber } = parsePhoneNumber(data.phone) ?? {}
        if (!countryCallingCode || !nationalNumber) {
            toast.error('Please enter a valid phone number')
            return
        }

        startTransition(async () => {
            const result = await generatePaymentLink({
                typology: selectedRoom,
                user: adaptUserSchemaWithPhoneToPmsUser(data, nationalNumber),
                reservation: adaptToPmsReservation({
                    typologyId: selectedRoom._id || '',
                    checkIn: selectedRoom.startDate || '',
                    checkOut: selectedRoom.endDate || '',
                    adults: parseInt(selectedRoom.adults || '2'),
                    children: parseInt(selectedRoom.children || '0'),
                    withPet: data.withPet,
                    withTransfer: data.withTransfer
                })
            })

            if (!result.success) {
                toast.error(result.error || 'Error creating payment link')
                return
            }

            router.push(result.link)
        })
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
                <Fields />
                <Summary isPending={isPending} selectedRoom={selectedRoom} />
            </form>
        </FormProvider>
    )
}

export default SummaryForm