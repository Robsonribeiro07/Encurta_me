import { AxiosInstance } from 'axios'

export interface IDeleteShortenProps {
  shortenedIuid: string
  shortenedUrl: string
  api?: AxiosInstance
}

export async function deleteShortenLinkHelper({ shortenedIuid, api }: IDeleteShortenProps) {
  if (!shortenedIuid || !api) throw new Error('shorten is required')

  try {
    const response = await api.put('/links/actions/delete/shorten', {
      shortenedIuid,
    })

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}
