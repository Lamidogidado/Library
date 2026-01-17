import { useDispatch } from 'react-redux'
import { filterChange, clearFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value
    if (value === '') {
      dispatch(clearFilter())
    } else {
      dispatch(filterChange(value))
    }
  }

  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
