import React from 'react'
import StatisticLine from './StatisticLine'

type StatProps = {
  good: number
  neutral: number
  bad: number
}

const Statistics = ({ good, neutral, bad }: StatProps) => {
  //   const total = props.values.reduce((accum, prev) => accum + prev, 0)
  //   const positivePercentage = (100 * props.values[0]) / total
  //   if (props.values[0] === 0 && props.values[1] === 0 && props.values[2] === 0) {
  //     return (
  //       <div>
  //         <h2>Statistics</h2>
  //         No Feedback Given
  //       </div>
  //     )
  //   }

  const allStatistics = good + neutral + bad
  const average = (good - bad) / allStatistics
  const positivePercentage = (good / allStatistics) * 100

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No Feedback Given
      </div>
    )
  }

  return (
    <>
      <h2>statistics</h2>

      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={allStatistics} />
          <StatisticLine text='average' value={average ? average : 0} />
          <StatisticLine
            text='positive'
            value={`${positivePercentage ? positivePercentage : 0} %`}
          />
        </tbody>
      </table>
    </>
  )
}
export default Statistics
