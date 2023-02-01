import React from 'react'

const Filter = ({ filter, filterByName }: any) => {
  return (
    <div>
      filter shown with
      <input type='search' value={filter} onChange={filterByName} />
    </div>
  )
}

export default Filter
