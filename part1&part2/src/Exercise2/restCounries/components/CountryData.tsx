import React from 'react'
import WeatherData from './WeatherData'

const CountryData = ({ queryCountry }: any) => {
  return (
    <div>
      <h1>{queryCountry.name.common}</h1>
      <div>
        <strong>Capital:</strong> {queryCountry.capital}
      </div>
      <div>
        <strong>Area: </strong> {queryCountry.area} km²
      </div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(queryCountry.languages).map((language: any) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={queryCountry.flags.png}
        alt={`${queryCountry.name.common} flag`}
        width='100px'
      />
      <WeatherData city={queryCountry.capital} />
    </div>
  )
}

export default CountryData
