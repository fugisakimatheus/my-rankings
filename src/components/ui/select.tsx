'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const selectVariants = cva('select', {
  variants: {
    colorScheme: {
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      neutral: 'select-neutral',
    },
    variant: {
      outline: 'select-bordered',
      ghost: 'select-ghost',
    },
    selectSize: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
    },
  },
})

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, selectSize, colorScheme, variant, ...props }, ref) => (
    <select
      className={cn(selectVariants({ variant, selectSize, colorScheme, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  ),
)
Select.displayName = 'Select'

export { Select }
