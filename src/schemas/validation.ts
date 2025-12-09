import { z } from 'zod'

export const filterSchema = z.object({
  bank: z.string().optional(),
  minIncome: z.number().min(0).optional(),
  minCreditScore: z.number().min(300).max(900).optional(),
  maxApr: z.number().min(0).max(50).optional()
})

export const chatMessageSchema = z.object({
  product_id: z.string().uuid(),
  message: z.string().min(1).max(500),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    })
  ).optional()
})

export type FilterInput = z.infer<typeof filterSchema>

export type ChatMessageInput = z.infer<typeof chatMessageSchema>
