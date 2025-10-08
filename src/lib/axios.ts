import axios from 'axios'
const api = (token?: string | null) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API + '/api' || 'http://localhost:8081/api',
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
