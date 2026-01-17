import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from './request'
const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidteQueries({queryKey: ['notes']})
    }
  })
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      const notes = queryClient.invalidateQueries(['notes'])
      queryClient.setQueriesData(['notes'], notes.concat(newNode))
       
    }
  })


  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
     newNoteMutation.mutate({content, import: true})
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, import: !note.important})
  }
 
  const result = useQuery({
   queryKey: ['notes'],
   queryFn: getNotes
  })
  console.log(JSON.parse(JSON.stringfy(result)))
  if(result.isLoading){
    return <div>loading data...</div>
  }
  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  )
}

export default App
