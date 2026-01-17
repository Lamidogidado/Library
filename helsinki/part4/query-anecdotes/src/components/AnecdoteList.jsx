import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from '../requests'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteMutation.mutate(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
