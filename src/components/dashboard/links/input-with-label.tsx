import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IRequiredInputsProps } from '@/hooks/links/use-form-create-shorten'

export function InputWithLabel({ register, label, placeholder, type, name }: IRequiredInputsProps) {
  return (
    <div className="flex  flex-col items-start flex-1 w-full  py-1  gap-3 ">
      <Label htmlFor={name} className="text-primary/60">
        {label}
      </Label>
      <Input type={type} id={name} placeholder={placeholder} {...register} />
    </div>
  )
}
