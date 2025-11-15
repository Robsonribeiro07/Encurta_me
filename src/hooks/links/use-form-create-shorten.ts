import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreatedShorten } from '@/api/services/link/hooks/use-create-shorten'
import { createLinkSchema, LinkFormData } from '@/schemas/link.schema'
import { useEditShorten } from '@/api/services/link/hooks/use-edit-shorten'

export type LinkShotenType = LinkFormData
export interface IRequiredInputsProps {
  placeholder: string
  type: string
  label: string
  name: keyof LinkShotenType
  register?: ReturnType<UseFormRegister<LinkShotenType>>
  disabled?: boolean
}

export interface IuseFormMetod {
  Metod?: 'create' | 'update'
  requiredCustomUrl?: boolean
}
export function useFormNewLink({
  Metod = 'create',
  requiredCustomUrl = false,
}: IuseFormMetod = {}) {
  const { handleSubmitMutation, isPending } = useCreatedShorten()
  const { handleSubmitMutation: handleSubmitMutationEdit } = useEditShorten()
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting, isValid },
  } = useForm<LinkShotenType>({
    resolver: zodResolver(createLinkSchema(requiredCustomUrl)),
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
      register: register('customUrl', { required: requiredCustomUrl }),
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
    Metod == 'create' ? handleSubmitMutation(data) : handleSubmitMutationEdit(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
    isValid,
    inputRequiered,
    reset,
  }
}
