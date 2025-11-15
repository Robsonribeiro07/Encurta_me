import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Link, Lock, Pencil, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InputWithLabel } from '../links/input-with-label'

import { useFormNewLink } from '@/hooks/links/use-form-create-shorten'
import { FeedbackError } from '../links/feedback-error'
import { IShortenedUrlResponse } from '@/api/services/link/helpers/get-all-shorten'

interface IEditLinkProps {
  link: IShortenedUrlResponse
}

export function EditLink({ link }: IEditLinkProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { inputRequiered, handleSubmit, isSubmitting, errors, reset } = useFormNewLink({
    requiredCustomUrl: true,
    Metod: 'update',
  })

  const [originalUrlInput, customUrlInput, expiresAtInput] = inputRequiered

  const handleOpenModal = () => setIsOpen(true)
  const handleSetCloseModal = () => setIsOpen(false)

  useEffect(() => {
    reset({
      originalUrl: link.originalUrl,
    })
  }, [link])
  return (
    <>
      <Button className="mx-1" onClick={handleOpenModal}>
        <Pencil />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleSetCloseModal}>
        <DialogContent className="h-[60vh]">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center gap-6">
              <Pencil color="var(--purple-500)" />
              <h1 className="font-semibold">Edit Link</h1>
            </DialogTitle>
          </DialogHeader>

          <form
            className="w-full md:fit flex flex-col  h-fit  rounded-lg bg-card p-4 px-6 z-10"
            onSubmit={handleSubmit}
          >
            <div className="mt-3 flex  flex-col items-center justify-between gap-5  w-full">
              <div className="flex-1 w-full flex relative">
                <InputWithLabel key={originalUrlInput.name} {...originalUrlInput} disabled />
                <Lock className="absolute right-5 bottom-3" opacity={0.6} size={20} />
              </div>

              <div className="w-full">
                <InputWithLabel key={customUrlInput.name} {...customUrlInput} />
                {errors.customUrl && <FeedbackError errors={errors} fieldName="customUrl" />}
              </div>
            </div>

            <div className="mt-3 w-full">
              <InputWithLabel key={customUrlInput.name} {...expiresAtInput} />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <Button
                className="h-15 bg-purple-500 text-secondary-foreground min-w-fit  p-0"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Aguarde...'
                ) : (
                  <>
                    <Link size={16} className="max-lg:sr-only" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                className="h-15 text-secondary-foreground min-w-fit  p-0"
                type="button"
                onClick={handleSetCloseModal}
                variant="outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Aguarde...'
                ) : (
                  <>
                    <X size={16} className="max-lg:sr-only" />
                    Cancelar
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
