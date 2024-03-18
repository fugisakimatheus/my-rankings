'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/wired/form/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function SignInForm() {
  const form = useForm<any>({
    resolver: zodResolver({} as any),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-slate-100">My Rankings</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput control={form.control} name="email" label="E-mail" />
            <FormInput control={form.control} name="password" label="Senha" inputType="password" />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="mr-1">
              <Link className="text-sm underline hover:no-underline" href="/reset-password">
                Esqueceu sua senha?
              </Link>
            </div>
            <Button type="submit" isLoading={false}>
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
