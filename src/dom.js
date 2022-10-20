import moment from 'moment';
import { getWeatherData } from './api';

let degreeC = true;
let chosenDegree = `&#176C`;

function updateData(data) {
  let celcius = data.main.temp;
  let name = data.name;
  let country = data.sys.country;
  let stat = data.weather[0].main;
  let icon = data.weather[0].icon;
  let max = data.main.temp_max;
  let min = data.main.temp_min;
  if (degreeC) {
    celcius = Math.round(celcius - 273.15);
    max = Math.round(max - 273.15);
    min = Math.round(min - 273.15);
  } else if (!degreeC) {
    celcius = Math.round(1.8 * (celcius - 273) + 32);
    max = Math.round(1.8 * (max - 273) + 32);
    min = Math.round(1.8 * (min - 273) + 32);
  }
  updateMainWeather(celcius, name, country, stat, icon, max, min);
}

async function getInfoData(data) {
  let humidity = await data.main.humidity;
  let feelLike = await data.main.feels_like;
  let windSpeed = await data.wind.speed;
  if (degreeC) {
    feelLike = Math.round(feelLike - 273.15);
  } else if (!degreeC) {
    feelLike = Math.round(1.8 * (feelLike - 273) + 32);
  }
  updateInfoWeather(humidity, feelLike, windSpeed);
}

function updateMainWeather(celcius, name, country, stat, icon, max, min) {
  const degree = document.querySelector('.degree');
  const location = document.querySelector('.location');
  const weather = document.querySelector('.weather');
  const img = document.querySelector('.icon');
  const date = document.querySelector('.date');
  const time = document.querySelector('.time');
  const maxTemp = document.querySelector('.max');
  const minTemp = document.querySelector('.min');
  degree.innerHTML = `${celcius}${chosenDegree}`;
  location.textContent = `${name}, ${country}`;
  weather.textContent = stat;
  img.src = `http://openweathermap.org/img/wn/${icon}.png`;
  date.textContent = `${moment().format('dddd')}, ${moment().format(
    'MMMM Do YYYY'
  )}`;
  time.textContent = moment().format('LT');
  maxTemp.innerHTML = `H: ${max}${chosenDegree}`;
  minTemp.innerHTML = `L: ${min}${chosenDegree}`;
}

function updateInfoWeather(humidity, feelLike, windSpeed) {
  const humidDegree = document.querySelector('.humidity-degree');
  const feelLikeDegree = document.querySelector('.feel-like-degree');
  const windSpeedDegree = document.querySelector('.wind-speed-degree');
  humidDegree.textContent = `${humidity}%`;
  feelLikeDegree.innerHTML = `${feelLike}${chosenDegree}`;
  windSpeedDegree.textContent = `${windSpeed} km/h`;
}

function animation() {
  const leftInfo = document.querySelector('.left-info');
  const rightInfo = document.querySelector('.right-info');
  leftInfo.classList.add('fade-in');
  rightInfo.classList.add('fade-in');
  setTimeout(function () {
    leftInfo.classList.remove('fade-in');
    rightInfo.classList.remove('fade-in');
  }, 1000);
}

const toggle = document.querySelector('input[type="checkbox"]');
toggle.addEventListener('change', function () {
  let currentCity = document.querySelector('.location').textContent;
  if (!toggle.checked) {
    degreeC = true;
    chosenDegree = `&#176C`;
    getWeatherData(currentCity);
  } else {
    degreeC = false;
    chosenDegree = `&#176F`;
    getWeatherData(currentCity);
  }
});

export {
  animation,
  updateInfoWeather,
  updateMainWeather,
  getInfoData,
  updateData,
};
