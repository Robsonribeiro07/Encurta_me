import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Spinner } from './ui/spinner'
import api from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { getUrlBackend } from '@/utils/get-url-backend'

export function RenderApiWarning() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let openPopupTimeout: NodeJS.Timeout

    async function pingAPI() {
      try {
        openPopupTimeout = setTimeout(() => {
          setIsLoading(true)
        }, 4000)

        const response = await axios.put(`${getUrlBackend()}/ping`)

        if (response.status === 200) {
          clearTimeout(openPopupTimeout) // resposta rápida → NÃO mostrar popup
          setIsLoading(false)
        }
      } catch (err) {
        // Render dormindo → mostrar popup e continuar tentando
        setIsLoading(true)
        setTimeout(pingAPI, 2000)
      }
    }

    pingAPI()

    return () => clearTimeout(openPopupTimeout)
  }, [])

  return (
    <Dialog open={isLoading}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Warning</DialogTitle>
          <DialogDescription>
            Olá! Este projeto utiliza a hospedagem gratuita Render. Após períodos de inatividade, o
            servidor pode levar alguns segundos para responder novamente. Obrigado pela compreensão!
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
