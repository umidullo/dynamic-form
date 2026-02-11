import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { getDocuments } from '@/api/queries'
import { Spinner } from '@/components/ui/spinner'

export function DocumentTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner data-icon="inline" />
      </div>
    )

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>DOCUMENT TITLE</TableHead>
          <TableHead>CREATE DATE</TableHead>
          <TableHead>DOCUMENT SIZE</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((document) => (
          <TableRow key={document.id}>
            <TableCell>{document.id}</TableCell>
            <TableCell>{document.document_name}</TableCell>
            <TableCell>{formatDate(document.created_at)}</TableCell>
            <TableCell>{document.field_count}</TableCell>
            <TableCell>
              <Button asChild variant={'link'}>
                <Link to={`/document/${document.id}`}>Document preview</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
