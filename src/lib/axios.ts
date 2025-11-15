import { getUrlBackend } from '@/utils/get-url-backend'
import axios, { AxiosInstance } from 'axios'

export type Api = { api: AxiosInstance }
const api = (token?: string | null, withoutApi?: boolean) =>
  axios.create({
    baseURL: getUrlBackend() + '/api' || 'http://localhost:8081/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

if (process.env.NEXT_PUBLIC_DELAY_API === 'true') {
  api().interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return config
  })
}
export default api
