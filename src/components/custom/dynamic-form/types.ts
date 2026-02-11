import z from 'zod'

const OptionSchema = z.object({
  value: z.union([z.boolean(), z.string(), z.number()]),
  label: z.string(),
})

const OptionsSchema = z.array(OptionSchema)

export const formValueSchema = z
  .object({
    field_seq: z.number().min(1),
    field_type: z.string(),
    select_values: z.string().optional(),
    field_name: z.string().min(1, 'Required'),
    is_mandatory: z.boolean(),
  })
  .superRefine((item, ctx) => {
    if (item.field_type === '2') {
      if (!item.select_values) {
        ctx.addIssue({
          path: ['select_values'],
          message: 'Select options are required for Select field',
          code: 'custom',
        })
        return
      }

      try {
        const parsed = JSON.parse(item.select_values)
        OptionsSchema.parse(parsed)
        console.log('parsed', parsed, OptionsSchema.parse(parsed))
      } catch {
        ctx.addIssue({
          path: ['select_values'],
          message: 'Invalid select options JSON',
          code: 'custom',
        })
      }
    }
  })

export const formSchema = z.object({
  document_name: z.string().min(1, 'Required'),
  form_values: z.array(formValueSchema),
})
