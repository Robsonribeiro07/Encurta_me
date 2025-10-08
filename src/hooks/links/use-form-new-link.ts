import { z } from 'zod'
import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutationShorten } from '../../api/hooks/use-mutation-shorten'

const LinkShoten = z.object({
  originalUrl: z.string().url('Por favor insira uma url valida').min(1, 'URL is required'),
  customUrl: z
    .union([
      z
        .string()
        .min(3, 'Custom URL must be at least 3 characters')
        .regex(
          /^[a-zA-Z0-9_-]+$/,
          'Custom URL can only contain letters, numbers, hyphens and underscores',
        ),
      z.literal(''), // Allow empty string
    ])
    .optional(),

  expiresAt: z
    .union([
      z
        .string()
        .refine(
          (dateStr) => {
            const date = new Date(dateStr)
            return date > new Date()
          },
          {
            message: 'Expiration date must be in the future',
          },
        )
        .or(z.literal('')),
    ])
    .optional(),
})

export type LinkShotenType = z.infer<typeof LinkShoten>
export interface IRequiredInputsProps {
  placeholder: string
  type: string
  label: string
  name: keyof LinkShotenType
  register?: ReturnType<UseFormRegister<LinkShotenType>>
}
export function useFormNewLink() {
  const { handleSubmitMutation, isPending } = useMutationShorten()
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isValid },
  } = useForm<LinkShotenType>({
    resolver: zodResolver(LinkShoten),
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
