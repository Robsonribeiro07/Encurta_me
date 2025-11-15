import { AxiosInstance } from 'axios'

export interface IEditShortenLinkProps {
  originalUrl: string
  customUrl?: string
  expiresAt?: string | undefined
  status?: string
  api?: AxiosInstance
}

export async function editShortenLinkHelper({
  originalUrl,
  customUrl,
  expiresAt,
  api,
  status,
}: IEditShortenLinkProps) {
  if (!originalUrl || !api) throw new Error('Original URL is required')

  try {
    const response = await api.patch('/links/actions/update/shorten', {
      newData: {
        shortenedUrl: customUrl,
        originalUrl,
        expiresAt: expiresAt === '' ? undefined : expiresAt,
        status,
      },
    })

    console.log(response.data)

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}
