import React, { useState } from 'react'
import Button from './components/Button'

const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'Taiye is good',
    'Believe in yourself',
  ]

  const [selected, setSelected] = useState(0)
  // const [votes, setVotes] = useState(
  //   new Array(7 + 1).join('0').split('').map(parseFloat)
  // )
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    setVotes((prevState) => {
      const newVotes = [...prevState]
      newVotes[selected] += 1
      return [...newVotes]
    })
  }

  // const highestVote = () => {
  //   return votes.reduce((cur, prev) => {
  //     if (cur >= prev) {
  //       return cur
  //     } else {
  //       return prev
  //     }
  //   }, 0)
  // }

  const highestVote = votes.indexOf(Math.max(...votes))
  // console.log(anecdotes[highestVote])

  return (
    <>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected]}
      <div>
        <strong>has {votes[selected]} votes : </strong>
      </div>
      <br />
      <div>
        <Button handleClick={getRandomQuote} text='next anecdote' /> &nbsp;
        <Button handleClick={addVote} text='Vote' />
      </div>
      {/* {votes.reduce((prev, cur) => prev + cur, 0) === 0 ? (
        ''
      ) : (
        <div>
          <h2>Anecdote with most votes</h2>{' '}
          {anecdotes[votes.indexOf(highestVote())]} <br />
          <strong>has {highestVote()} votes</strong>
        </div>
      )} */}
      <div>
        <h2>Anecdote with most votes</h2>
        {votes[highestVote] === 0 ? (
          <p>No anecdote has votes today. Be first to vote.</p>
        ) : (
          <div>
            {anecdotes[highestVote]} <br />
            <strong>has {votes[highestVote]} votes</strong>
          </div>
        )}
      </div>
    </>
  )
}

export default Anecdotes
