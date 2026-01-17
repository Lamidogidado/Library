// src/components/Filter.jsx
export const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with{" "}
    <input value={filter} onChange={e => setFilter(e.target.value)} />
  </div>
)
