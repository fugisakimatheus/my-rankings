import { User } from '@/shared/models'
import { prisma } from '@/shared/prisma-client'
import { parseResponse } from '@/server/response'
import { hash } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, username, password, image } = (await request.json()) as User

  const user = await prisma.user.findUnique({
    where: { email, OR: [{ username }] },
  })

  if (user) {
    return parseResponse(StatusCodes.BAD_REQUEST, { message: 'User already exists!' })
  }

  const hashedPassword = await hash(password, 10)

  const createdUser = await prisma.user.create({
    data: {
      email,
      username,
      image,
      password: hashedPassword,
    },
  })

  const newUser: Partial<User> = {
    id: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
    image: createdUser.image,
    createdAt: createdUser.createdAt,
    updatedAt: createdUser.updatedAt,
  }

  return parseResponse(StatusCodes.OK, { user: newUser })
}
