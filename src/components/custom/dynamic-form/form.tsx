import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
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

const selectOptions = [
  { label: 'Input', value: '1' },
  { label: 'Select', value: '2' },
  { label: 'NumberInput', value: '3' },
] as const

const formValueSchema = z
  .object({
    field_seq: z.number().min(1),
    field_type: z.string(),
    select_values: z.string().optional(),
    field_name: z.string().min(1, 'Required'),
    is_mandatory: z.boolean(),
  })
  .refine(
    (item) => item.field_type !== '1' || Boolean(item.select_values?.trim()),
    {
      message: 'Select options are required for Select field',
      path: ['select_values'],
    },
  )

const formSchema = z.object({
  document_name: z.string().min(1, 'Required'),
  form_values: z.array(formValueSchema),
})

export function DynamicForm() {
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'form_values',
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <ScrollArea className="h-[500px]">
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
                                {selectOptions.map((language) => (
                                  <SelectItem
                                    key={language.value}
                                    value={language.value}
                                  >
                                    {language.label}
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
                        name={`form_values.${index}.field_type`}
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
                            checked={field.value}
                            onChange={field.onChange}
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
          <Button type="submit" form="form-rhf-array">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
