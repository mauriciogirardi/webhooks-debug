import z from 'zod'

const envSchema = z.object({
  VITE_BASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(import.meta.env)
