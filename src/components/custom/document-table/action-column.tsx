import { deleteDocument } from '@/api/queries'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Edit, Trash } from 'lucide-react'

export const ActionColumn = ({ id }: { id: number }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })

  const handleDelete = (id: number) => {
    mutation.mutate(id)
  }

  return (
    <div className="flex gap-4">
      <Button asChild variant={'link'}>
        <Link to={`/document/$id`} params={{ id: String(id) }}>
          Document preview
        </Link>
      </Button>
      <Button variant={'outline'} size={'icon'}>
        <Edit />
      </Button>
      <Button
        variant={'destructive'}
        size={'icon'}
        onClick={() => handleDelete(id)}
      >
        {mutation.isPending ? <Spinner data-icon="inline" /> : <Trash />}
      </Button>
    </div>
  )
}
