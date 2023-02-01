import React, { useState } from 'react'
// import axios from 'axios'

// const PersonForm = ({ addPerson, data }: any) => {
//   return (
//     <div>
//       <form onSubmit={addPerson}>
//         <div>
//           <span>
//             name: <input value={data.name} onChange={data.handleNameChange} />
//           </span>
//           <br />
//           <br />
//           <span>
//             number:{' '}
//             <input value={data.newNumber} onChange={data.handleNumberChange} />
//           </span>
//         </div>
//         <div>
//           <button type='submit'>add</button>
//         </div>
//       </form>
//       {/* <div>debug: {newName}</div> */}
//     </div>
//   )
// }

const PersonForm = (props: any) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(e.target.value)
  }

  const addPersonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      alert('Please enter a valid Name and number')
      return
    }

    if (+newNumber.length < 4) {
      alert('Please enter a valid Number (> 4 characters)')
      return
    }

    console.log(newName, newNumber)
    props.onAddPerson(newName, newNumber)

    setNewName('')
    setNewNumber('')

    //   axios
    //     .post(
    //       'http://localhost:4000/api/persons',
    //       props.onAddPerson(newName, newNumber)
    //     )
    //     .then((response: any) => response.data)
    //   setNewName('')
    //   setNewNumber('')
  }
  return (
    <div>
      <form onSubmit={addPersonHandler}>
        <div>
          <label htmlFor='username'>name:</label>
          <input
            type='text'
            id='username'
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='number'>number:</label>
          <input id='number' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit' className='btn'>
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
