"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { UserSchema, type UserSchemaValues, defaultUserSchema } from '@/schemas/summary.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Fields from './fields'
import Summary from './summary'
import { Typology } from '@/types/room'

const SummaryForm = ({ selectedRoom }: { selectedRoom: Typology | null }) => {

    const form = useForm({
        defaultValues: defaultUserSchema,
        resolver: zodResolver(UserSchema)
    })

    console.log({selectedRoom})

    const onSubmit = async (data: UserSchemaValues) => {
        console.log({ data })
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
                <Fields />
               <Summary selectedRoom={selectedRoom} />
            </form>
        </FormProvider>
    )
}

export default SummaryForm