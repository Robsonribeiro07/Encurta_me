'use client'

import { Copy, CopyPlus } from 'lucide-react'
import { toast } from 'sonner'

export function CoppyButton({ text }: { text: string }) {
  const handleCoppy = async () => {
    await navigator.clipboard.writeText(text).then(() => {
      toast.success('copiado com sucesso!')
    })
  }

  return <Copy onClick={handleCoppy} className="absolute right-0" />
}
