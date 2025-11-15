import { z } from 'zod'

export const createLinkSchema = (requiredCustomUrl: boolean = false) =>
  z.object({
    originalUrl: z.string().url('Por favor insira uma URL válida').min(1, 'URL é obrigatória'),

    customUrl: requiredCustomUrl
      ? z
          .string()
          .min(3, 'URL customizada deve ter pelo menos 3 caracteres')
          .regex(
            /^[a-zA-Z0-9_-]+$/,
            'URL customizada pode conter apenas letras, números, hífens e underscores',
          )
      : z
          .union([
            z
              .string()
              .min(3, 'URL customizada deve ter pelo menos 3 caracteres')
              .regex(
                /^[a-zA-Z0-9_-]+$/,
                'URL customizada pode conter apenas letras, números, hífens e underscores',
              ),
            z.literal(''),
          ])
          .optional(),

    expiresAt: z.string().optional(),
  })

export type LinkFormData = z.infer<ReturnType<typeof createLinkSchema>>

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
