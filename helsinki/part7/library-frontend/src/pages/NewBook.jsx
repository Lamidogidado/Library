import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({ setError }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    // We still refetch authors because updating an author's bookCount 
    // manually in the cache is complex and refetching is safer here.
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.length > 0 
        ? error.graphQLErrors.map(e => e.message).join('\n')
        : error.message
      setError(messages)
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook

      // Helper function to update the cache safely
      const updateCacheWith = (query, variables) => {
        const dataInCache = cache.readQuery({ query, variables })
        
        if (dataInCache) {
          // Safety: check if book already exists to prevent UI duplicates
          const alreadyExists = dataInCache.allBooks.some(b => b.id === addedBook.id)
          
          if (!alreadyExists) {
            cache.writeQuery({
              query,
              variables,
              data: {
                ...dataInCache,
                allBooks: dataInCache.allBooks.concat(addedBook)
              }
            })
          }
        }
      }

      // 1. Update the "All genres" list (where genre variable is null)
      updateCacheWith(ALL_BOOKS, { genre: null })

      // 2. Update specific genre lists that are currently in the cache
      addedBook.genres.forEach(g => {
        updateCacheWith(ALL_BOOKS, { genre: g })
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    navigate('/books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook