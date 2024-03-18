import { cn } from '@/lib/utils'
import React from 'react'

export type LoadingProps = React.HTMLAttributes<HTMLSpanElement> & {}

const Loading = React.forwardRef<HTMLSpanElement, LoadingProps>(({ className, ...props }, ref) => {
  return <span className={cn('loading loading-spinner', className)} {...props}></span>
})

Loading.displayName = 'Loading'

export { Loading }
