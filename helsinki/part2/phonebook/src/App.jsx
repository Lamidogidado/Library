import { useState, useEffect } from "react"
import personsService from "./services/person"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
    .getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
 

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook. Replace the old number with the new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
            showNotification(`Updated ${returnedPerson.name}'s number`)
          })
        .catch(err => {
         const message = err.response?.data?.error || 'Something went wrong'
        showNotification(message, "error")
})


      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${returnedPerson.name}`)
        setNewName("")
        setNewNumber("")
      })
      .catch(err => {
     const message = err.response?.data?.error || 'Something went wrong'
     showNotification(message, "error")
})

  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (!confirmDelete) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Deleted ${person.name}`)
      })
      .catch(err => {
        showNotification(
          `Information of ${person.name} has already been removed from server`,
          "error"
        )
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
