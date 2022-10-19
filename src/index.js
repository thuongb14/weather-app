const error = document.querySelector('.error');
import moment from 'moment';

async function getWeatherData(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081026e44e0bea0643898ce5f8966c3d`,
      { mode: 'cors' }
    );
    const formatted = await data.json();
    updateData(formatted);
  } catch {
    error.textContent = 'City not found';
  }
}

function updateData(data) {
  const celcius = Math.round(data.main.temp - 273.15);
  const name = data.name;
  const country = data.sys.country;
  const stat = data.weather[0].main;
  const icon = data.weather[0].icon;
  updateMainWeather(celcius, name, country, stat, icon);
  updateInfoData(data)
}

function updateMainWeather(celcius, name, country, stat, icon) {
  const degree = document.querySelector('.degree');
  const location = document.querySelector('.location');
  const weather = document.querySelector('.weather');
  const img = document.querySelector('.icon');
  const date = document.querySelector('.date')
  const time = document.querySelector('.time')
  degree.innerHTML = `${celcius}<span>&#176;</span>C`;
  location.textContent = `${name}, ${country}`;
  weather.textContent = stat;
  img.src = `http://openweathermap.org/img/wn/${icon}.png`;
  date.textContent = `${moment().format('dddd')}, ${moment().format('MMMM Do YYYY')}`
  time.textContent = moment().format('LT');
}

const form = document.querySelector('form');
form.addEventListener('submit', function (e, input) {
  error.textContent = '';
  e.preventDefault();
  input = document.getElementById('city').value;
  getWeatherData(input);
  form.reset();
});

function updateInfoData(data) {
  const humidity = data.main.humidity
  const feelLike = Math.round(data.main.feels_like - 273.15)
  const windSpeed = data.wind.speed
  updateInfoWeather(humidity, feelLike, windSpeed)
}

function updateInfoWeather(humidity, feelLike, windSpeed) {
  const humidDegree = document.querySelector('.humidity-degree')
  const feelLikeDegree = document.querySelector('.feel-like-degree')
  const windSpeedDegree = document.querySelector('.wind-speed-degree')
  humidDegree.textContent = `${humidity}%`
  feelLikeDegree.innerHTML = `${feelLike}&#176;C`
  windSpeedDegree = `${windSpeed} km/h`
}

getWeatherData('Melbourne, Au');
