import { FieldErrors } from 'react-hook-form'

interface FeedbackErrorProps {
  errors: FieldErrors<{
    originalUrl: string
    customUrl?: string
    expiresAt?: string
  }>
  fieldName: 'originalUrl' | 'customUrl' | 'expiresAt'
}

export function FeedbackError({ errors, fieldName }: FeedbackErrorProps) {
  const error = errors[fieldName]

  if (!error) return null

  return <p className="text-sm h-fit max-h-fit text-destructive ">{error.message?.toString()}</p>
}
