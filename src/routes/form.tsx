import { DynamicForm } from '@/components/custom/dynamic-form/DynamicForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form')({
  component: DocumnetForm,
})

function DocumnetForm() {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <DynamicForm />
    </div>
  )
}
