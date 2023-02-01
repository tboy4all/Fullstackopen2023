import React from 'react'
import Course from './components/Course'
// import Total from './components/Total'

const PartTwo = () => {
  //   const course = {
  //     id: 1,
  //     name: 'Half Stack application development',
  //     parts: [
  //       {
  //         name: 'Fundamentals of React',
  //         exercises: 10,
  //         id: 1,
  //       },
  //       {
  //         name: 'Using props to pass data',
  //         exercises: 7,
  //         id: 2,
  //       },
  //       {
  //         name: 'State of a component',
  //         exercises: 14,
  //         id: 3,
  //       },
  //       {
  //         name: 'Redux',
  //         exercises: 11,
  //         id: 4,
  //       },
  //     ],
  //   }

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  //   const total = courses.map((list) =>
  //     list.parts.reduce((acc, prev) => acc + prev.exercises, 0)
  //   )
  //   console.log('this is total courses', total)

  return (
    <>
      <h1>Web development curriculum</h1>

      {/* <h1>{courses.name}</h1>
      <div>
        {course.parts.map((course) => {
          return (
            <p key={course.id}>
              {course.name} {course.exercises}
            </p>
          )
        })}
        <p>
          <strong>total of {total} exercises</strong>
        </p>
      </div> */}

      {/* <div>
        {courses.map((list) => (
          <div key={list.id}>
            <h2>{list.name}</h2>
            {list.parts.map((listCourse) => (
              <p key={listCourse.id}>
                {listCourse.name} {listCourse.exercises}
              </p>
            ))}
          </div>
        ))}
      </div> */}
      {/* <p>
        <strong>total of {total} exercises</strong>
      </p> */}
      <Course courses={courses} />
    </>
  )
}

export default PartTwo
