// useErrorHandler.ts
import { toast } from 'sonner'

export function ErrorHandler(error?: any) {
  if (!error) return

  switch (error.status) {
    case 400:
      toast.error(error.message)
      break
    case 401:
      toast.warning(error.message)
      break
    case 404:
      toast.error(error.message)
      break
    default:
      toast.error('Erro inesperado, tente novamente mais tarde.')
  }
}
