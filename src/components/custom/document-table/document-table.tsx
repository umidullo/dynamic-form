import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { getDocuments } from '@/api/queries'
import { Spinner } from '@/components/ui/spinner'
import { ActionColumn } from '@/components/custom/document-table/action-column'

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
              <ActionColumn id={document.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
