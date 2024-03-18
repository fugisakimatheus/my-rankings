import { User } from '@/shared/models'
import { prisma } from '@/shared/prisma-client'
import { mailTransporter } from '@/server/mail'
import { parseResponse } from '@/server/response'
import { StatusCodes } from 'http-status-codes'
import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { env } from '@/shared/env'

export async function POST(request: NextRequest) {
  const { email } = (await request.json()) as Pick<User, 'email'>

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return parseResponse(StatusCodes.BAD_REQUEST, { message: 'User not exists' })
  }

  const token = crypto.randomBytes(32).toString('hex')

  mailTransporter.sendMail({
    from: `"My Rankings" <${env.MAIL_USER}>`,
    to: email,
    subject: 'Reset Password',
    html: `
      <p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password</p>
    `,
  })

  return parseResponse(StatusCodes.OK, { message: 'Email sent' })
}
