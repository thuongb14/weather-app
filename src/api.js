import { updateData, getInfoData } from './dom';

async function getWeatherData(city) {
  const error = document.querySelector('.error');
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081026e44e0bea0643898ce5f8966c3d`,
      { mode: 'cors' }
    );
    const formatted = await data.json();
    updateData(formatted);
    getInfoData(formatted);
  } catch {
    error.textContent = 'Oopps...City not found';
  }
}

export { getWeatherData };
