import { z } from 'zod'
import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreatedShorten } from '@/api/services/link/hooks/use-create-shorten'
import { LinkSchema } from '@/schemas/link.schema'

export type LinkShotenType = z.infer<typeof LinkSchema>
export interface IRequiredInputsProps {
  placeholder: string
  type: string
  label: string
  name: keyof LinkShotenType
  register?: ReturnType<UseFormRegister<LinkShotenType>>
}
export function useFormNewLink() {
  const { handleSubmitMutation, isPending } = useCreatedShorten()
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isValid },
  } = useForm<LinkShotenType>({
    resolver: zodResolver(LinkSchema),
  })

  const inputRequiered: IRequiredInputsProps[] = [
    {
      placeholder: 'Original URL',
      type: 'url',
      label: 'Original URL',
      name: 'originalUrl',
      register: register('originalUrl'),
    },
    {
      placeholder: 'Custom URL',
      type: 'text',
      name: 'customUrl',
      label: 'Custom URL',
      register: register('customUrl', { required: false }),
    },
    {
      placeholder: 'Expiration Date',
      type: 'date',
      label: 'Expiration Date',
      register: register('expiresAt'),
      name: 'expiresAt',
    },
  ]

  const onSubmit = (data: LinkShotenType) => {
    console.log(data)
    handleSubmitMutation(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
    isValid,
    inputRequiered,
  }
}
