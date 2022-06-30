//REAL TIME DATE
let now = new Date();
let h2 = document.querySelector("h2");
let hours = date.getHours();
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

//ENTER CITY NAME + SEARCH REAL TIME TEMP
function enterCity(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-text");
  searchElement.innerHTML = cityInput.value;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let message = `${temperature}°`;
    let realtemp = document.querySelector("#temperature");
    realtemp.innerHTML = message;
  }
  let apiKey = "f996a06dc2ceee1ee9c5480eaa578d50";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

//CURRENT LOCATION BUTTON
function curentLocAndTemp(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("#temperature");
  h1.innerHTML = `${response.data.name}`;
  h2.innerHTML = `${Math.round(response.data.main.temp)}°`;
}

function showPos(position) {
  let apiKey = "f996a06dc2ceee1ee9c5480eaa578d50";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
navigator.geolocation.getCurrentPosition(showPos);

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

enterCity("Kyiv");
