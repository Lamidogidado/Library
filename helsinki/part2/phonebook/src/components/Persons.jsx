// src/components/Persons.jsx
export const Persons = ({ persons, filter, deletePerson }) => {
  const filteredPersons = (persons || []).filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}
