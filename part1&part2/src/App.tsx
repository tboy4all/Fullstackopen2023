import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import Filter from './Exercise2/phonebook/components/Filter'
import Person from './Exercise2/phonebook/components/Person'
import PersonForm from './Exercise2/phonebook/components/PersonForm'
import personService from './Exercise2/phonebook/services/persons'
import Notification from './Exercise2/phonebook/components/Notification'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  // ])

  const [persons, setPersons] = useState([] as any)
  // const [newName, setNewName] = useState('')
  // const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [message, setMessage] = useState(null as any)

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(e.target.value)
  //   setNewName(e.target.value)
  // }

  // const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewNumber(e.target.value)
  // }

  // const addPersonHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const personsArray = persons.map((e: any) => e.name)
  //   // const personsArray = persons.filter((person) => person.name === newName)
  //   const personObject = {
  //     ...persons,
  //     name: newName,
  //     number: newNumber,
  //     id: persons.length + 1,
  //   }

  //   if (personsArray.includes(`${personObject.name}`)) {
  //     // const currName = persons.filter((person: any) => person.name === name)
  //     window.confirm(`${newName} is already added to phonebook.`)
  //     return
  //   }

  //   setPersons(persons.concat(personObject))
  //   setPersonsToShow(persons.concat(personObject))

  //   setNewName('')
  //   setNewNumber('')
  // }

  // const addPersonHandler = (uName: string, uNumber: number) => {
  //   setPersons((prevPersonsList: any) => {
  //     return [
  //       ...prevPersonsList,
  //       { name: uName, number: uNumber, id: Math.random().toString() },
  //     ]
  //   })
  // }

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
      setPersonsToShow(response)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  // Handle adding person to database
  const addPersonHandler = (uName: string, uNumber: string) => {
    // setPersons((prevPersonsList: any) => {
    //   const updatedPerson = [...prevPersonsList]
    //   updatedPerson.unshift({
    //     name: uName,
    //     number: uNumber,
    //     id: Math.random().toString(),
    //   })

    //   return updatedPerson
    // })

    const personObject = {
      name: uName,
      number: uNumber,
      id: persons.length + 1,
    }

    const currentName = persons.filter((person: any) => person.name === uName)

    if (currentName.length === 0) {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name} to phonebook`)
        })
        .catch((error) => setMessage(error.response.data.error))
    } else {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentName[0].id, personObject)
          .then((returnedPerson) => {
            const updatedPerson = persons.map((person: any) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
            setPersons(updatedPerson)
            setPersonsToShow(updatedPerson)
            setMessage(`Updated ${personObject.name}'s number`)
          })
          .catch((err) => err.response.data.error)
      }
    }

    // setPersons(persons.concat(personObject))
    // setPersonsToShow(persons.concat(personObject))

    // axios
    //   .post('http://localhost:3001/persons', personObject)
    //   .then((response) => {
    //     setPersons(persons.concat(response.data))
    //   })

    // const personsArray = persons.map((person: any) => person.name)
    // if (personsArray.includes(uName)) {
    //   alert(`${uName} is already added to phonebook.`)
    //   return
    // }
  }

  // Deleting from the Phonebook

  const deletePersonHandler = (personId: any, name: string) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(personId).then((response) => {
        const updatedPerson = persons.filter(
          (person: any) => person.id !== personId
        )
        setPersons(updatedPerson)
        setPersonsToShow(updatedPerson)
        setMessage(`Removed ${name} from phonebook`)
      })
    }
  }

  // axios.post('http://localhost:3001/persons', updatedPer)

  // fetching data from db.json
  // useEffect(() => {
  //   axios.get('http://localhost:3001/persons').then((response) => {
  //     setPersons(response.data)
  //   })
  // }, [])

  // Handle filter
  const filterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    setNewFilter(search)
    setPersonsToShow(
      persons.filter(
        (person: any) =>
          person.name.toLowerCase().includes(search.toLocaleLowerCase())
        // person.newName.toLowerCase().indexOf(e.target.value.toLowerCase()) !==-1
      )
    )
  }

  return (
    // <PartTwo />
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={newFilter} filterByName={filterByName} />
      <h3>Add a new</h3>

      <PersonForm onAddPerson={addPersonHandler} />
      <h3>Numbers</h3>
      {newFilter === '' ? (
        <Person persons={persons} onDeletePerson={deletePersonHandler} />
      ) : (
        <Person persons={personsToShow} />
      )}
    </div>
  )
}

export default App
