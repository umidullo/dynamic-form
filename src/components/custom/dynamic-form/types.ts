import z from 'zod'

export const formValueSchema = z
  .object({
    field_seq: z.number().min(1),
    field_type: z.string(),
    select_values: z.string().optional(),
    field_name: z.string().min(1, 'Required'),
    is_mandatory: z.boolean(),
  })
  .refine(
    (item) => item.field_type !== '2' || Boolean(item.select_values?.trim()),
    {
      message: 'Select options are required for Select field',
      path: ['select_values'],
    },
  )

export const formSchema = z.object({
  document_name: z.string().min(1, 'Required'),
  form_values: z.array(formValueSchema),
})
