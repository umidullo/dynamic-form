import { getDocumentById } from '@/api/queries'
import GeneratedInput from '@/components/custom/generated-input.tsx'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
              <GeneratedInput field={field} />
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
