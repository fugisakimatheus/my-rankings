import { z } from 'zod'

const envSchema = z
  .object({
    // Database
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
    // JWT
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    // Mail
    MAIL_USER: z.string(),
    MAIL_PASSWORD: z.string(),
  })
  .refine(({ DB_NAME, DB_PASSWORD, DB_USER, DATABASE_URL }) => {
    if (DATABASE_URL.includes(`${DB_USER}:${DB_PASSWORD}@${DB_NAME}`)) {
      return true
    }
    throw new Error('DATABASE_URL must be a valid mongodb connection string')
  })

export const env = envSchema.parse(process.env)
