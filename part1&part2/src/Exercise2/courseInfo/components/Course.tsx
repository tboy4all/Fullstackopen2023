import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

type CourseProps = {
  courses: Record<string, any>
}

const Course = ({ courses }: CourseProps) => {
  return (
    <div>
      {courses.map((course: any) => {
        return (
          <div key={course.id}>
            <Header courses={course} />
            <Content courses={course} />
            <Total courses={course} />
          </div>
        )
      })}
    </div>
  )
}
export default Course
