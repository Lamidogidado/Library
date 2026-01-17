// filterReducer.js
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

// action creators
export const filterChange = filter => ({ type: 'SET_FILTER', data: filter })
export const clearFilter = () => ({ type: 'CLEAR_FILTER' })

export default filterReducer
