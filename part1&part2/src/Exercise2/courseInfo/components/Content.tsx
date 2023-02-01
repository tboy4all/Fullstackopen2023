import Part from '../Part'

type ContentProps = {
  courses: Record<string, number[]>
}

// type CouProps = {
//   name: string
//   id: number
//   exercises: number
// }

const Content = ({ courses }: ContentProps) => {
  return (
    <>
      {courses.parts.map((part: any) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
      })}
    </>
  )
}

export default Content
