import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DOCUMENT_OPTIONS, GENDER_OPTIONS } from '@/config/select-lists'
import { defaultGuestSchema, GuestSchema, type GuestSchemaValues } from '@/schemas/guest-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Summary from './summary'

const GuestForm = () => {
    const form = useForm({
        defaultValues: defaultGuestSchema,
        resolver: zodResolver(GuestSchema)
    })

    const onSubmit = (data: GuestSchemaValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
            <FieldGroup>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4'>
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
                                            <SelectItem key={option.value} value={option.value}>
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
                                            <SelectItem key={option.value} value={option.value}>
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
                                <Input
                                    {...field}
                                    id="phone"
                                    className='h-12'
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Phone"
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
            </FieldGroup>
            <Summary />
        </form>
    )
}

export default GuestForm