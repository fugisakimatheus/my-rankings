import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva('input flex items-center gap-2', {
  variants: {
    colorScheme: {
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      neutral: 'input-neutral',
    },
    variant: {
      outline: 'input-bordered',
      ghost: 'input-ghost',
    },
    inputSize: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
    },
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, colorScheme, variant, inputSize, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <label
        className={cn(inputVariants({ colorScheme, variant, inputSize, className }), className)}
      >
        {leftIcon}

        <input type={type} className="grow" ref={ref} {...props} />

        {rightIcon}
      </label>
    )
  },
)
Input.displayName = 'Input'

export { Input }
