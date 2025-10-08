import api from '@/lib/axios'
import { AxiosInstance } from 'axios'

export interface ICreateShortenLinkProps {
  originalUrl: string
  customUrl?: string
  expiresAt?: string | undefined
  api?: AxiosInstance
}

export async function createShortenLinkHelper({
  originalUrl,
  customUrl,
  expiresAt,
  api,
}: ICreateShortenLinkProps) {
  if (!originalUrl || !api) throw new Error('Original URL is required')

  try {
    const response = await api.post('/links/shorten', {
      originalUrl,
      customUrl,
      expiresAt,
    })

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}
