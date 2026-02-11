import type { documentByIdFieldSchema } from '@/api/types'

import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type z from 'zod'

export const GeneratedInput = ({
  field,
}: {
  field: z.infer<typeof documentByIdFieldSchema>
}) => {
  return (
    <Field>
      <FieldLabel>
        {field.field_name}
        {field.is_mandatory ? (
          <span className="text-destructive">*</span>
        ) : null}
      </FieldLabel>
      {field.field_type === 2 ? (
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {field.select_values?.map(
              (option: { label: string; value: string }, index: number) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      ) : (
        <Input type={field.field_type === 3 ? 'number' : 'text'} />
      )}
    </Field>
  )
}
