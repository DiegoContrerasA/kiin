"use client"

import { Controller, useWatch } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DOCUMENT_OPTIONS, GENDER_OPTIONS } from '@/config/data'

import { PhoneInput } from '@/components/ui/phone-input'

import {  CarFrontIcon, Dog } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import Addon from './addon'

const Fields = () => {
    const form = useFormContext()
    const airportPickup = useWatch({ name: "airportPickup", control: form.control })
    const petFee = useWatch({ name: "petFee", control: form.control })

    const toggleAirportPickup = () => {
        form.setValue("airportPickup", !airportPickup)
    }

    const togglePetFee = () => {
        form.setValue("petFee", !petFee)
    }

    return (
        <FieldGroup className='flex flex-col gap-10'>
            <div className='bg-white p-6 rounded-lg flex flex-col gap-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="lastName">
                                    Last Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="lastName"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Last Name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Controller
                        name="documentType"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="documentType">
                                    Document type
                                </FieldLabel>

                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="documentType"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-[120px] !h-12"
                                    >
                                        <SelectValue placeholder="Select your Document type" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {DOCUMENT_OPTIONS.map((option) => (
                                            <SelectItem className='!h-12' key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="documentNumber"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="documentNumber">
                                    Document Number
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="documentNumber"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Document Number"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                className='h-12'
                                aria-invalid={fieldState.invalid}
                                placeholder="Email"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Controller
                        name="gender"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="gender">
                                    Gender
                                </FieldLabel>
                                <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id="documentType"
                                        aria-invalid={fieldState.invalid}
                                        className="min-w-[120px] !h-12"
                                    >
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {GENDER_OPTIONS.map((option) => (
                                            <SelectItem className='!h-12' key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="phone">
                                    Phone
                                </FieldLabel>
                                <PhoneInput
                                    {...field}
                                    id="phone"
                                    className='h-12 [&>button]:!h-12 [&>input]:!h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="+ 57 3333333333"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                    <Controller
                        name="nationality"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="nationality">
                                    Nationality
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="nationality"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Nationality"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="socialMediaProfile"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="socialMediaProfile">
                                    Social Media Profile
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="phone"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="@"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
            </div>
            <div className="space-y-10">
                <Addon
                    value={petFee}
                    setValue={togglePetFee}
                    icon={Dog}
                    title="Pet Fee"
                    description="Add pet fee for "
                    price={30}
                />
                <Addon
                    value={airportPickup}
                    setValue={toggleAirportPickup}
                    icon={CarFrontIcon}
                    title="Airport Pickup"
                    description="Add airport pickup service for "
                    price={100}
                />
            </div>
        </FieldGroup>
    )

}

export default Fields