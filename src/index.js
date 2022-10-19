import moment from 'moment';

const error = document.querySelector('.error');
const form = document.querySelector('form');

let degreeC = true;
let chosenDegree = ``;

async function getWeatherData(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081026e44e0bea0643898ce5f8966c3d`,
      { mode: 'cors' }
    );
    const formatted = await data.json();
    updateData(formatted);
    updateInfoData(formatted);
  } catch {
    error.textContent = 'Oopps...City not found';
  }
}

function updateData(data) {
  const celcius = Math.round(data.main.temp - 273.15);
  const name = data.name;
  const country = data.sys.country;
  const stat = data.weather[0].main;
  const icon = data.weather[0].icon;
  const max = data.main.temp_max;
  const min = data.main.temp_min;
  if (degreeC) {
    let max = Math.round(max - 273.15);
    let min = Math.round(min - 273.15);
  } else if (!degreeC) {
    let max = Math.round(max - 273.15);
    let min = Math.round(min - 273.15);
  }
  updateMainWeather(celcius, name, country, stat, icon, max, min);
}

async function updateInfoData(data) {
  const humidity = await data.main.humidity;
  const feelLike = Math.round(data.main.feels_like - 273.15);
  const windSpeed = await data.wind.speed;
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
  degree.innerHTML = `${celcius}&#176C`;
  location.textContent = `${name}, ${country}`;
  weather.textContent = stat;
  img.src = `http://openweathermap.org/img/wn/${icon}.png`;
  date.textContent = `${moment().format('dddd')}, ${moment().format(
    'MMMM Do YYYY'
  )}`;
  time.textContent = moment().format('LT');
  maxTemp.innerHTML = `H: ${max}{&#176C}`;
  minTemp.innerHTML = `L: ${min}&#176C`;
}

function updateInfoWeather(humidity, feelLike, windSpeed) {
  const humidDegree = document.querySelector('.humidity-degree');
  const feelLikeDegree = document.querySelector('.feel-like-degree');
  const windSpeedDegree = document.querySelector('.wind-speed-degree');
  humidDegree.textContent = `${humidity}%`;
  feelLikeDegree.innerHTML = `${feelLike}&#176;C`;
  windSpeedDegree.textContent = `${windSpeed} km/h`;
}

form.addEventListener('submit', function (e, input) {
  e.preventDefault();
  error.textContent = '';
  input = document.getElementById('city').value;
  getWeatherData(input);
  form.reset();
});

getWeatherData('Melbourne, Au');

const toggle = document.querySelector('input[type="checkbox"]');

toggle.addEventListener('change', function () {
  if (toggle.checked) {
    degreeC = true;
    chosenDegree = `&#176;C`;
  } else {
    console.log('f');
  }
});
