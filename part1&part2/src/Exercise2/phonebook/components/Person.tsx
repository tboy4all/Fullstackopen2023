import React from 'react'

export type PersonsListType = {
  name: string
  number: number
  id: string
}

const Person = ({ persons, onDeletePerson }: any) => {
  return (
    <ul>
      {persons.length > 0 &&
        persons.map((person: PersonsListType) => (
          <li key={person.id}>
            {person.name} &nbsp;
            {person.number}
            <button
              onClick={() => onDeletePerson(person.id, person.name)}
              className='btn'
            >
              delete
            </button>
          </li>
        ))}
    </ul>
  )
}

export default Person
