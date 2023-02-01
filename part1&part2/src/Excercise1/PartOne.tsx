import React, { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'
// import Button from './components/Button'
// import History from './components/History'

const PartOne = () => {
  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)

  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0,
  // })

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     left: clicks.left + 1,
  //     right: clicks.right,
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     left: clicks.left,
  //     right: clicks.right + 1,
  //   }
  //   setClicks(newClicks)
  // }

  // const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })

  // const handleRightClick = () =>
  //   setClicks({ ...clicks, right: clicks.right + 1 })

  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  // const [allClicks, setAll] = useState<string[]>([])

  // const handleLeftClick = () => {
  //   setAll(allClicks.concat('L'))
  //   setLeft(left + 1)
  // }

  // const handleRightClick = () => {
  //   setAll(allClicks.concat('R'))
  //   setRight(right + 1)
  // }

  // Excercise 1d
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const handleGoodClick = () => {
  //   setGood(good + 1)
  // }

  // const handleNeutralClick = () => {
  //   setNeutral(neutral + 1)
  // }

  // const handleBadClick = () => {
  //   setBad(bad + 1)
  // }

  return (
    <>
      {/* Object */}
      {/* {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right} */}
      {/* Array */}
      {/* {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} /> */}
      <h1>give feedback</h1>
      {/* <Button onClick={handleGoodClick}>good</Button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button> */}

      <Button handleClick={setGood} text='good' />
      <Button handleClick={setNeutral} text='neutral' />
      <Button handleClick={setBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default PartOne
