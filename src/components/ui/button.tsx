import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Loading } from './loading'

const buttonVariants = cva('btn', {
  variants: {
    colorScheme: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
    },
    variant: {
      outline: 'btn-outline',
      link: 'btn-link',
      ghost: 'btn-ghost',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    format: {
      block: 'btn-block',
      circle: 'btn-circle',
      square: 'btn-square',
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      format,
      colorScheme,
      className,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, format, colorScheme, className }))}
        ref={ref}
        {...props}
      >
        <>
          {isLoading && <Loading />}
          {children}
        </>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
