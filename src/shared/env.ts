import { z } from 'zod'

const envSchema = z
  .object({
    // Database
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
    // Token
    TOKEN_SECRET: z.string(),
  })
  .refine(({ DB_NAME, DB_PASSWORD, DB_USER, DATABASE_URL }) => {
    if (DATABASE_URL.includes(`${DB_USER}:${DB_PASSWORD}@${DB_NAME}`)) {
      return true
    }
    throw new Error('DATABASE_URL must be a valid mongodb connection string')
  })

export const env = envSchema.parse(process.env)
