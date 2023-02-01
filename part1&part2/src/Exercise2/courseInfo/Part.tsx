import React from 'react'

type PartProps = {
  name: string
  exercises: number
}

const Part = ({ name, exercises }: PartProps) => {
  return (
    <p>
      <strong>{name}: </strong>
      {exercises} Exercises
    </p>
  )
}

export default Part
