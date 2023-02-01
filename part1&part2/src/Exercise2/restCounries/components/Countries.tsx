import React from 'react'

const Countries = ({ countriesToShow, setCountriesToShow }: any) => {
  if (countriesToShow.length === 1) return null

  return countriesToShow.map((country: any) => (
    <div key={country.name.official}>
      {country.name.common}
      <button onClick={() => setCountriesToShow([country])}>show</button>
    </div>
  ))
}

export default Countries
