import { DynamicForm } from '@/components/custom/dynamic-form/Form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/document/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <div>Hello "/document"! {id}</div>
}
