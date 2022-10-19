/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const error = document.querySelector('.error');\n\nasync function getWeatherData(city) {\n  try {\n    const data = await fetch(\n      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081026e44e0bea0643898ce5f8966c3d`,\n      { mode: 'cors' }\n    );\n    const formatted = await data.json();\n    updateData(formatted);\n  } catch {\n    error.textContent = 'Oopps...City not found';\n  }\n}\n\nfunction updateData(data) {\n  const celcius = Math.round(data.main.temp - 273.15);\n  const name = data.name;\n  const country = data.sys.country;\n  const stat = data.weather[0].main;\n  const icon = data.weather[0].icon;\n  updateWeather(celcius, name, country, stat, icon);\n}\n\nfunction updateWeather(celcius, name, country, stat, icon) {\n  const degree = document.querySelector('.degree');\n  const location = document.querySelector('.location');\n  const weather = document.querySelector('.weather');\n  const img = document.querySelector('.icon');\n  degree.innerHTML = `${celcius}<span>&#176;</span>C`;\n  location.textContent = `${name}, ${country}`;\n  weather.textContent = stat;\n  img.src = `http://openweathermap.org/img/wn/${icon}.png`;\n}\n\nconst form = document.querySelector('form');\nform.addEventListener('submit', function (e, input) {\n  error.textContent = '';\n  e.preventDefault();\n  input = document.getElementById('city').value;\n  getWeatherData(input);\n  form.reset();\n});\n\ngetWeatherData('Melbourne, Au');\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;