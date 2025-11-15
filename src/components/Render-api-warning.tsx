import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Spinner } from './ui/spinner'
import axios from 'axios'
import { getUrlBackend } from '@/utils/get-url-backend'
import { useQuery } from '@tanstack/react-query'

export function RenderApiWarning() {
  const [isLoading, setIsLoading] = useState(false)

  const { isError, isFetching } = useQuery({
    queryKey: ['ping-api'],
    queryFn: async () => {
      const res = await axios.put(`${getUrlBackend()}/Ping/Teste`)
      return res.data
    },
    retry: true,
    refetchInterval: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isFetching) {
      timeout = setTimeout(() => {
        setIsLoading(true)
      }, 4000)
    }

    if (!isFetching && !isError) {
      setIsLoading(false)
    }

    if (isError) {
      setIsLoading(true)
    }

    return () => clearTimeout(timeout)
  }, [isFetching, isError])

  return (
    <Dialog open={isLoading}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Warning</DialogTitle>
          <DialogDescription>
            Olá! Este projeto utiliza a hospedagem gratuita Render. Após períodos de inatividade, o
            servidor pode levar alguns segundos para responder novamente.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3 bg-purple-500 rounded-lg py-3">
          <Spinner />
          <h1>Aguardando resposta da API...</h1>
        </div>
      </DialogContent>
    </Dialog>
  )
}
