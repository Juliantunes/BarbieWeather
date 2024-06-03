import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import './App.css';

const App = () => {
  const apiKey = "daba641a1006e4fc3596a0f7cb455c45";
  const openCageApiKey = "a1cc12f90e564266a03fb1b19c3b98f2"; // Replace with your actual OpenCage API key
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  const fetchSuggestions = (input) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${openCageApiKey}&limit=10`)
      .then(response => response.json())
      .then(data => {
        const cities = data.results.map(result => result.formatted);
        setSuggestions(cities);
      })
      .catch(error => {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      });
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value);
    }
  };

 
  

  const getBarbieImage = () => {
    if(!weatherData.main) return ''; 

    const temp = weatherData.main.temp;
    switch(true) {

      case temp <50 :
        return '/images/winter-barbie.gif'

      case temp >= 50 && temp<70 :
        return '/images/spring-barbie.webp'

      case temp >=70 && temp <90 :
        return '/images/summer-barbie.gif'
      
      case temp >= 90 :
        return '/images/desert-barbie.webp'

        default: 
          return '';
    }
  };

  return (
    <div className="container">
      <Autocomplete
        getItemValue={(item) => item}
        items={suggestions}
        renderItem={(item, isHighlighted) =>
          <div
            key={item}
            className={`autocomplete-item ${isHighlighted ? 'autocomplete-item-highlighted' : ''}`}
          >
            {item}
          </div>
        }
        value={city}
        onChange={handleInputChange}
        onSelect={(val) => setCity(val)}
        inputProps={{
          className: 'autocomplete-input',
          placeholder: 'Enter City...',
          onKeyPress: getWeather,
        }}
        wrapperProps={{ className: 'autocomplete-container' }}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to the weather app! Enter a city to get the weather for.</p>
          <img src="/images/background-car.png" alt="car" className="car-image" />
        </div>
      ) : (
        <div className='weather-data'>
          <p className='city'> {weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F </p>
          <p className='temp'>{Math.round((weatherData.main.temp - 32) * 5 / 9)}°C </p>
          <p className='feels'> Feels like: {Math.round(weatherData.main.feels_like)}°F </p>   
          <p className='description'> Description: {weatherData.weather[0].main}</p>
            
            <img src = {getBarbieImage()} alt = "Weather Barbie" className='barbie-image' />
        </div>
      )}
    </div>
  );
};

export default App;