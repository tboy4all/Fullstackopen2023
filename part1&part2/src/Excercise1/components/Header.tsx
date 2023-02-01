import React from 'react'
type NameProps = {
  course: string
}

const Hello = (props: NameProps) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

export default Hello
