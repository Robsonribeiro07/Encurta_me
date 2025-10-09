import api from '@/lib/axios'
import { AxiosInstance } from 'axios'

export type filter = 'all' | 'active' | 'inactive' | 'pending' | 'expired'
interface ICreateShortenLinkProps {
  api: AxiosInstance
  page?: number
  limit?: number
  filter?: filter
  filterInput?: string
}

export interface IShortenedUrlResponse {
  _id?: string
  id: string
  originalUrl: string
  shortenedUrl: string
  userId: string
  clicks: number
  expiresAt?: Date
  createdAt?: Date
  updatedAt?: Date
  status: 'active' | 'inactive' | 'pending' | 'expired'
  __v?: number
}

export interface IGetAllShortenResult {
  shortenedUrls: IShortenedUrlResponse[]
  totalPages: number
  currentPage: number
  totalItems: number
  totalClicks: number
}
export async function getAllShortenLinksHelpers({
  api,
  page = 1,
  limit = 10,
  filter = 'all',
  filterInput = undefined,
}: ICreateShortenLinkProps): Promise<IGetAllShortenResult> {
  try {
    const response = await api.get(
      `/links/all-shorten?page=${page}&limit=${limit}&filter=${filter}&filterInput=${filterInput}`,
    )

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}
