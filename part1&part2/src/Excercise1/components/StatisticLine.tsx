import React from 'react'

type StatisticProps = {
  text: string
  value: number | string
}

const StatisticLine = ({ text, value }: StatisticProps) => {
  return (
    <tr>
      <td>
        <strong>{text}</strong>
      </td>
      <td>{value}</td>
    </tr>
  )
}

export default StatisticLine
