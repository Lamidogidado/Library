import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload)
      anecdote.votes += 1
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotesData = await anecdotes.getAll()
    dispatch(setAnecdotes(anecdotesData))
  }
}
export const appendAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotes.create(content)
    dispatch(createAnecdote(newAnecdote))
  }
}
export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
