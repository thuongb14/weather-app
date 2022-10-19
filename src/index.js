const error = document.querySelector('.error');

async function getWeatherData(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081026e44e0bea0643898ce5f8966c3d`,
      { mode: 'cors' }
    );
    const formatted = await data.json();
    updateData(formatted);
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
  updateWeather(celcius, name, country, stat, icon);
}

function updateWeather(celcius, name, country, stat, icon) {
  const degree = document.querySelector('.degree');
  const location = document.querySelector('.location');
  const weather = document.querySelector('.weather');
  const img = document.querySelector('.icon');
  degree.innerHTML = `${celcius}<span>&#176;</span>C`;
  location.textContent = `${name}, ${country}`;
  weather.textContent = stat;
  img.src = `http://openweathermap.org/img/wn/${icon}.png`;
}

const form = document.querySelector('form');
form.addEventListener('submit', function (e, input) {
  error.textContent = '';
  e.preventDefault();
  input = document.getElementById('city').value;
  getWeatherData(input);
  form.reset();
});

getWeatherData('Melbourne, Au');
