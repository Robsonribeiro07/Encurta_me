// useCopyToClipboard.ts
'use client'
import { toast } from 'sonner'
import { playSoundNotification } from '@/utils/notification/play-sound'

export function useCopyToClipboard() {
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast.success('copiado com sucesso!')
    playSoundNotification('success')
  }

  return { copy }
}
