type TotalProps = {
  courses: Record<string, number[]>
}

const Total = ({ courses }: TotalProps) => {
  return (
    <p>
      <strong>Number of Exercises: </strong>
      {courses.parts.reduce(
        (accumulator: number, current: any) => accumulator + current.exercises,
        0
      )}
    </p>
  )
}

export default Total
