import { DynamicForm } from '@/components/custom/dynamic-form/Form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form')({
  component: DocumnetForm,
})

function DocumnetForm() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <DynamicForm />
    </div>
  )
}
