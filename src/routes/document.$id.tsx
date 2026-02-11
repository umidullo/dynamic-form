import { getDocumentById } from '@/api/queries'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/document/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(Number(id)),
  })

  console.log(data)

  return <div>Hello "/document"! {id}</div>
}
