import { getUrlBackend } from '@/utils/get-url-backend'
import axios, { AxiosInstance } from 'axios'

export type Api = { api: AxiosInstance }
const api = (token?: string | null) =>
  axios.create({
    baseURL: getUrlBackend() + '/api' || 'http://localhost:8081/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

console.log('URL API:', getUrlBackend() + '/api')
if (process.env.NEXT_PUBLIC_DELAY_API === 'true') {
  api().interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return config
  })
}
export default api
