const baseurl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseurl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return response.json()
}
const create = async (anecdoteObject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdoteObject)
  }

  const response = await fetch(baseurl, options)

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return response.json()
}

export default { getAll, create }