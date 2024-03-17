import { env } from '@/shared/env'
import { prisma } from '@/shared/prisma-client'
import { parseResponse } from '@/shared/server/response'
import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as { email: string; password: string }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return parseResponse(StatusCodes.NOT_FOUND, { message: 'User not found' })
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return parseResponse(StatusCodes.UNAUTHORIZED, { message: 'Invalid email or password' })
  }

  const accessToken = jwt.sign({ userId: user.id }, env.TOKEN_SECRET, { expiresIn: '2d' })

  return parseResponse(StatusCodes.OK, { accessToken })
}
