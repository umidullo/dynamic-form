import { getDocumentById } from '@/api/queries'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/document/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(Number(id)),
  })

  console.log(data)

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner data-icon="inline" />
      </div>
    )

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{data?.data?.documentName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {data?.data?.fields.map((field) => (
              <Field>
                <FieldLabel>
                  {field.field_name}{' '}
                  {field.is_mandatory && (
                    <span className="text-destructive">*</span>
                  )}
                </FieldLabel>
                {field.field_type === 2 ? (
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.select_values?.map(
                        (
                          option: { label: string; value: string },
                          index: number,
                        ) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input />
                )}
              </Field>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate({ to: '/' })}>Back</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
