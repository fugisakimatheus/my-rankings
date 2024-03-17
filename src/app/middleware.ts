import { env } from '@/shared/env'
import { parseResponse } from '@/shared/server/response'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authorization = request.headers.get('Authorization') ?? ''
  const token = authorization.replace('Bearer ', '')

  let response: NextResponse

  try {
    jwt.verify(token, env.TOKEN_SECRET)
    response = NextResponse.next()
  } catch (error) {
    response = parseResponse(StatusCodes.UNAUTHORIZED, { message: 'Invalid token' })
  }

  return response
}

export const config = {
  matcher: ['/((?!api/sign-in|api/sign-up|_next/static|_next/image|favicon.ico).*)'],
}
