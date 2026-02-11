import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { selectOptions } from '@/components/custom/dynamic-form/constants'
import { formSchema } from '@/components/custom/dynamic-form/types'
import { useMutation } from '@tanstack/react-query'
import { createDocument } from '@/api/queries'
import type { TDocumentBody } from '@/api/types'
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from '@tanstack/react-router'

export function DynamicForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_name: '',
      form_values: [
        {
          field_name: '',
          field_seq: 1,
          field_type: '1',
          is_mandatory: true,
        },
      ],
    } as z.infer<typeof formSchema>,
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'form_values',
  })

  const mutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      form.reset()
      navigate({ to: '/' })
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    const createInput: TDocumentBody = {
      document_name: data.document_name,
      field_count: data.form_values.length,
      form_values: data.form_values.map((field) => ({
        field_seq: field.field_seq,
        field_type: Number(field.field_type),
        field_name: field.field_name,
        is_mandatory: field.is_mandatory,
        select_values: field.select_values ?? null,
      })),
    }
    mutation.mutate(createInput)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <ScrollArea className="h-125">
        <CardContent>
          <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet className="gap-4">
              <Controller
                name={`document_name`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>Document title</FieldLabel>
                    <FieldContent>
                      <Input
                        {...controllerField}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <FieldSeparator />
              {fields.map((field, index) => {
                const type = form.watch(`form_values.${index}.field_type`)

                return (
                  <FieldGroup key={field.id} className="gap-4">
                    <Controller
                      name={`form_values.${index}.field_seq`}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel>Field sequence (weight)</FieldLabel>

                          <FieldContent>
                            <Input
                              {...controllerField}
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                    <Controller
                      name={`form_values.${index}.field_type`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel>Field type</FieldLabel>

                          <FieldContent>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                aria-invalid={fieldState.invalid}
                                className="w-full"
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                {selectOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                    {type === '2' && (
                      <Controller
                        name={`form_values.${index}.select_values`}
                        control={form.control}
                        render={({ field: controllerField, fieldState }) => (
                          <Field
                            orientation="vertical"
                            data-invalid={fieldState.invalid}
                          >
                            <FieldLabel>Select options</FieldLabel>

                            <FieldContent>
                              <Textarea
                                placeholder="Type your options here"
                                {...controllerField}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldContent>
                          </Field>
                        )}
                      />
                    )}
                    <Controller
                      name={`form_values.${index}.field_name`}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel>Field name</FieldLabel>

                          <FieldContent>
                            <Input
                              {...controllerField}
                              aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                    <Controller
                      name={`form_values.${index}.is_mandatory`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <Checkbox
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel className="font-normal">
                            Mandatory
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <FieldSeparator />
                  </FieldGroup>
                )
              })}
              {/* {form.formState.errors.document_name?.root && (
              <FieldError errors={[form.formState.errors.document_name.root]} />
            )} */}
            </FieldSet>
          </form>
        </CardContent>
      </ScrollArea>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                field_name: '',
                field_seq: fields.length + 1,
                field_type: '1',
                is_mandatory: true,
              })
            }
            disabled={fields.length >= 5}
          >
            Add Field
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            form="form-rhf-array"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner data-icon="inline-start" />}
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
