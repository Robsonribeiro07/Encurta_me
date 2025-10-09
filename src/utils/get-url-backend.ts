export function getUrlBackend(): string {
  if (process.env.NEXT_PUBLIC_PROD === 'true') {
    return process.env.NEXT_PUBLIC_URL_API_PROD || ''
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return process.env.NEXT_PUBLIC_URL_API || ''
  }
  return process.env.NEXT_PUBLIC_URL_API || ''
}
