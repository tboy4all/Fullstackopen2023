import React from 'react'

// type ContentProps = {
//   exercises: Number
//   name: string
// }

const Content = ({ name, exercises }: any) => {
  return (
    <>
      <div>
        {name} {exercises}
      </div>
      {/* {parts.map((el: any) => (
        <div>
          <span>{el.name}</span>
        </div>
      ))} */}
    </>
  )
}

export default Content
