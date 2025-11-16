'use client'
import { Link } from 'lucide-react'
import { InputWithLabel } from './input-with-label'
import { Button } from '@/components/ui/button'
import { useFormNewLink } from '@/hooks/links/use-form-create-shorten'
import { FeedbackError } from './feedback-error'

export function CreateNewLink() {
  const { inputRequiered, handleSubmit, isSubmitting, errors } = useFormNewLink({
    Metod: 'create',
    requiredCustomUrl: false,
  })

  const [originalUrlInput, customUrlInput, expiresAtInput] = inputRequiered

  return (
    <form
      className="w-full md:fit flex flex-col   h-fit  rounded-lg bg-card p-4 px-6 z-10"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2 ">
        <Link color="#9461C1" size={20} />
        <h1 className="font-semibold">Criar novo link</h1>
      </div>

      <div className="mt-3 flex  max-sm:flex-col items-center justify-between gap-5  w-full">
        <div className="flex-1 w-full">
          {errors.originalUrl && <FeedbackError errors={errors} fieldName="originalUrl" />}

          <InputWithLabel key={originalUrlInput.name} {...originalUrlInput} />
        </div>

        <div className="max-md:w-full">
          {errors.customUrl && <FeedbackError errors={errors} fieldName="customUrl" />}
          <InputWithLabel key={customUrlInput.name} {...customUrlInput} />
        </div>
      </div>

      <div className="mt-3 grid md:grid-cols-[1fr_15%]  gap-5">
        <InputWithLabel key={customUrlInput.name} {...expiresAtInput} />
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
              Encurtar
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
