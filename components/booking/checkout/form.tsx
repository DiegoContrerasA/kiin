"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { UserSchema, type UserSchemaValues, defaultUserSchema } from '@/schemas/summary.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Fields from './fields'
import Summary from './summary'
import { Typology } from '@/types/room'
import { useTransition } from 'react'
import { createPaymentLink } from '@/actions/create-payment-link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { parsePhoneNumber } from 'react-phone-number-input'

const SummaryForm = ({ selectedRoom }: { selectedRoom: Typology | null }) => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm({
        defaultValues: defaultUserSchema,
        resolver: zodResolver(UserSchema)
    })

    const onSubmit = async (data: UserSchemaValues) => {
        if (!selectedRoom) return  toast.error('Please check your reservation details')

         const { countryCallingCode, nationalNumber } = parsePhoneNumber(data.phone) ?? {}
        if (!countryCallingCode || !nationalNumber) {
            toast.error('Please enter a valid phone number')
            return
        }

        const checkIn = selectedRoom.search?.checkIn || ''
        const checkOut = selectedRoom.search?.checkOut || ''
        const adults = parseInt(selectedRoom.search?.adults || '2')
        const children = parseInt(selectedRoom.search?.children || '0')

        startTransition(async () => {
            const result = await createPaymentLink({
                room: selectedRoom,
                user: { ...data, phone: nationalNumber, countryCode: countryCallingCode },
                checkIn,
                checkOut,
                adults,
                children,
                totalAmount: selectedRoom.priceInUsd || 0
            })

            if (!result.success) {
                toast.error(result.error || 'Error creating payment link')
                return
            }

            if (result.data?.url) {
                router.push(result.data.url)
            }
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