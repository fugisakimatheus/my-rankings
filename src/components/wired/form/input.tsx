'use client'

import { HTMLInputTypeAttribute } from 'react'
import { ControllerProps, FieldPath, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export type FormInputProps<F extends FieldValues, P extends Path<F>> = {
  control: ControllerProps<F, P>['control']
  name: ControllerProps<F, P>['name']
  label?: string
  description?: string
  inputType?: HTMLInputTypeAttribute
  showRequiredSymbol?: boolean
  showMessage?: boolean
  maxLength?: number
  minLength?: number
}

export default function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  const {
    label,
    name,
    control,
    inputType,
    description,
    showRequiredSymbol = false,
    showMessage = true,
    maxLength,
    minLength,
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <div className="mb-1 flex flex-row items-center gap-[6px]">
              <FormLabel className="block text-sm font-medium">
                {label} {showRequiredSymbol && <span className="text-rose-500">*</span>}
              </FormLabel>
            </div>
          )}

          <FormControl>
            <Input type={inputType} maxLength={maxLength} minLength={minLength} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
