import { IShortenedUrlResponse } from '@/api/services/link/helpers/get-all-shorten'
import { useDeleteShorten } from '@/api/services/link/hooks/use-delete-shorten'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'

export function DeleteShorten({ link }: { link: IShortenedUrlResponse }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpenModal = () => setIsOpen(true)
  const handleSetCloseModal = () => setIsOpen(false)

  const { handleSubmitMutation, isPending } = useDeleteShorten()
  return (
    <>
      <Button className="mx-1" onClick={handleOpenModal}>
        <Trash />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleSetCloseModal}>
        <DialogContent className="h-[20vh]">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center gap-6">
              <Trash color="var(--purple-500)" />
              <p className="font-semibold">Deseja deletar o link "{link.shortenedUrl}"</p>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex flex-row justify-center items-center gap-3">
            <Button variant="outline" onClick={handleSetCloseModal}>
              Cancelar
            </Button>
            <Button
              disabled={isPending}
              onClick={() =>
                handleSubmitMutation({
                  shortenedUrl: link.shortenedUrl,
                  shortenedIuid: link.id,
                })
              }
            >
              Deletar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
