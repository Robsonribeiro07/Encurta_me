import { z } from 'zod'

export const LinkSchema = z.object({
  originalUrl: z.string().url('Por favor insira uma URL válida').min(1, 'URL é obrigatória'),
  customUrl: z
    .union([
      z
        .string()
        .min(3, 'URL customizada deve ter pelo menos 3 caracteres')
        .regex(
          /^[a-zA-Z0-9_-]+$/,
          'URL customizada pode conter apenas letras, números, hífens e underscores',
        ),
      z.literal(''), // Permite string vazia
    ])
    .optional(),
  expiresAt: z.string().optional().or(z.literal('')),
})

export type LinkFormData = z.infer<typeof LinkSchema>

export interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  customUrl?: string
  expiresAt?: Date
  clicks: number
  createdAt: Date
  updatedAt: Date
  userId: string
}
