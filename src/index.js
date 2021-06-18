const menuToggle = document.querySelector('.toggle');
const main = document.querySelector('.main');

//Toggle Menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  main.classList.toggle('active');
})

//Current Date in Main box


function formatDate(date) {

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let monthIndex = date.getMonth();
  let months = ["Januar", "Febuary", "March","April","May","June","July","August","September","October","November","December"];
  let month = months[monthIndex];


  return `${day} ${month} ${hours}:${minutes}`;
}

// display the current date and time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//When someone search in bar the city will replace h2 and updates temp real time
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#precipitation").innerHTML = response.data.main.precipitation;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6f65ac3695a44ef64022cd653378b553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);

}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//default view when on page
searchCity("Seattle");

//clicking current button update temp real time base on location

function searchLocation(position) {
  let apiKey = "6f65ac3695a44ef64022cd653378b553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


// changing F and C with click

function convertToFahrenheit(response) {
  response.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(response) {
  response.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);