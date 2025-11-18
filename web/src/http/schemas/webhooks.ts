import { z } from 'zod'

export const webhookListItemSchema = z.object({
  id: z.uuidv7(),
  method: z.string(),
  pathname: z.string(),
  createdAt: z.coerce.date(),
})

export const webhookListSchema = z.object({
  webhooks: z.array(webhookListItemSchema),
  nextCursor: z.string().nullable(),
})

export const webhookDetailsSchema = z.object({
  id: z.uuidv7(),
  method: z.string(),
  ip: z.string(),
  createdAt: z.coerce.date(),
  statusCode: z.number(),
  contentType: z.string().nullable(),
  contentLength: z.number().nullable(),
  queryParams: z.record(z.string(), z.string()).nullable(),
  headers: z.record(z.string(), z.string()),
  body: z.string().nullable(),
  pathname: z.string(),
})
