// import axios from 'axios'
import React, { useState, useEffect } from 'react'

const WeatherData = ({ city }: any) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState([] as any)
  // const [lat, setLat] = useState([] as any)
  // const [long, setLong] = useState([] as any)

  // `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    const fetchData = async () => {
      // navigator.geolocation.getCurrentPosition(function (position) {
      //   setLat(position.coords.latitude)
      //   setLong(position.coords.longitude)
      // })

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          console.log(result)
        })
    }
    fetchData()
  }, [OPENWEATHER_API_KEY, city])

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>
            <strong>Temperature:</strong> {weather.main.temp}
            <span> &#176; C</span>
          </div>
          <img
            alt={weather.weather[0].description}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>
            <strong>Wind:</strong> {weather.wind.speed} mph direction{' '}
            {weather.wind['deg']} degrees
          </div>
        </div>
      ) : null}
    </>
  )
}

export default WeatherData
