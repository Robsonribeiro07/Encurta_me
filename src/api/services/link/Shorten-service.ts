import api from '@/lib/axios'
import { AxiosInstance } from 'axios'
import { createShortenLinkHelper, ICreateShortenLinkProps } from './helpers/create-shorten'
import { filter, getAllShortenLinksHelpers } from './helpers/get-all-shorten'

export class ShortenService {
  private api: AxiosInstance

  constructor(private Token: string | null) {
    if (!Token) throw new Error('Token is required')
    this.api = api(this.Token)
  }

  async createShortenLink(data: ICreateShortenLinkProps) {
    return await createShortenLinkHelper({
      ...data,
      api: this.api,
    })
  }
  async getAllLinks(page?: number, filter?: filter, limit?: number) {
    return await getAllShortenLinksHelpers({ api: this.api, page, limit, filter })
  }
}
