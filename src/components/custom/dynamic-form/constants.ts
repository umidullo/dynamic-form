import type { formSchema } from '@/components/custom/dynamic-form/types'
import type z from 'zod'

export const selectOptions = [
  { label: 'Input', value: '1' },
  { label: 'Select', value: '2' },
  { label: 'NumberInput', value: '3' },
]

export const defaultValues: z.infer<typeof formSchema> = {
  document_name: '',
  form_values: [
    {
      field_name: '',
      field_seq: 1,
      field_type: '1',
      is_mandatory: true,
    },
  ],
}
