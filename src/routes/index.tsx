import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import DocumentTable from '@/components/custom/document-table'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <div className="w-2/3 flex  justify-end">
        <Button asChild>
          <Link to="/form">New document form</Link>
        </Button>
      </div>
      <div className="w-2/3">
        <DocumentTable />
      </div>
    </div>
  )
}
