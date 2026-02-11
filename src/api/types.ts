import z from 'zod'

const documentSchema = z.object({
  document_name: z.string(),
  field_count: z.number(),
  created_at: z.string(),
  id: z.number(),
})

export type TDocument = z.infer<typeof documentSchema>

const documentResponseSchema = z.object({
  data: z.array(documentSchema),
  success: z.boolean(),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
  timestamp: z.string(),
})

export type TDocumentResponse = z.infer<typeof documentResponseSchema>

const documentCreateBodySchema = z.object({
  document_name: z.string(),
  form_values: z.array(
    z.object({
      field_seq: z.number(),
      field_type: z.number(),
      select_values: z.string().or(z.null()),
      field_name: z.string(),
      is_mandatory: z.boolean(),
    }),
  ),
  field_count: z.number(),
})

export type TDocumentBody = z.infer<typeof documentCreateBodySchema>
