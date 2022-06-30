//REAL TIME + DAY
let now = new Date();
let h2 = document.querySelector("h2");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day}, ${hours}:${minutes}`;

//CURRENT LOCATION
function curentLocAndTemp(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("#temperature");
  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${Math.round(response.data.main.temp)}°`;
}
function showPos(position) {
  let apiKey = "f996a06dc2ceee1ee9c5480eaa578d50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(curentLocAndTemp);
}
function getCurPos(event) {
  event.preventDefault();
}
navigator.geolocation.getCurrentPosition(showPos);

let curLocAndTempButton = document.querySelector("#cur-button");
curLocAndTempButton.addEventListener("submit", getCurPos);

//ENTER CITY NAME + SHOWING TEMP / HUM / UV index
function enterCity(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-text");
  searchElement.innerHTML = cityInput.value;
  let apiKey = "f996a06dc2ceee1ee9c5480eaa578d50";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  let realtemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  realtemp.innerHTML = `${temperature}°`;

  let realhum = document.querySelector("#humidity");
  let hum = response.data.main.humidity;
  realhum.innerHTML = `humidity ${hum}%`;

  let feelslike = document.querySelector("#feels-like");
  let feel = Math.round(response.data.main.feels_like);
  feelslike.innerHTML = `feels like ${feel}°`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

//CELCIUM OR FARENHEIT
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 78.8;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 26;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
