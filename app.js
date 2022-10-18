async function getWeatherData(city) {
  const data =
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=081026e44e0bea0643898ce5f8966c3d
    `);
  const formatted = await data.json();
  const celcius = Math.round(formatted.main.temp - 273.15);
  const country = formatted.sys.country
  const stat = formatted.weather[0].main
  const icon = formatted.weather[0].icon
  updateWeather(celcius, city, country, stat);
}

function updateWeather(cel, city, country, stat) {
  const degree = document.querySelector('.degree');
  const location = document.querySelector('.location')
  const weather = document.querySelector('.weather')
  degree.innerHTML = `${cel}<span>&#176;</span>C`;
  location.textContent = `${city}, ${country}`
  weather.textContent = stat
}

getWeatherData('London');
