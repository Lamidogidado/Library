import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Premature optimization is the root of all evil.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = content => ({
  content,
  id: getId(),
  votes: 0
})

  const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload)
      anecdote.votes += 1
    },
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload))
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer