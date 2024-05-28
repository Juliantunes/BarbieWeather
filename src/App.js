import React, {useState} from 'react'
import './App.css'


const App = () => {

const apiKey = "daba641a1006e4fc3596a0f7cb455c45"
const [weatherData, setWeatherData] = useState([{}])
const [city,setCity] = useState("")


const getWeather = (event) => {
  if (event.key == "Enter") {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
      response => response.json()
    ).then(
      data => {
        setWeatherData(data)
        setCity("")
      }
    ) 
  }
}


  return (
    <div className = "container"> 
      <input 
      className = "input" 
      placeholder = "Enter City..."
      onChange = {e => setCity(e.target.value)}
      value={city}
      onKeyPress= {getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to weather app! Enter in a city to get the weather of. </p>
        </div>
      ): (
        <div className ='weather-data'>
          <p className='city'> {weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F </p>
          <p className='temp'>{Math.round((weatherData.main.temp-32) * 5/9)}°C </p>
          <p className='feels'> Feels like: {Math.round(weatherData.main.feels_like)}°F </p>   
          <p className='Description'> Description: {weatherData.weather[0].main}</p>
          </div>
      )}

    </div>
  )
}

export default App 