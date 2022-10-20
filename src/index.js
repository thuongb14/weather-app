import { animation } from './dom';
import { getWeatherData } from './api';

const form = document.querySelector('form');
form.addEventListener('submit', function (e, input) {
  const error = document.querySelector('.error');
  e.preventDefault();
  error.textContent = '';
  input = document.getElementById('city').value;
  getWeatherData(input);
  animation();
  form.reset();
});

getWeatherData('Melbourne, AU');

window.onload = function () {
  getWeatherData('Melbourne, Au');
  animation();
};
