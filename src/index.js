//Toggle Menu
const menuToggle = document.querySelector('.toggle');
const main = document.querySelector('.main');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  main.classList.toggle('active');
})

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = "AM";
  if (hours >= 12) {
    amOrPm = "PM";
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = "12";
  }
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
  let day = days[date.getDay()];
  let monthIndex = date.getMonth();
  let months = ["January", "Febuary", "March","April","May","June","July","August","September","October","November","December"];
  let month = months[monthIndex];
  let numberDay = date.getDate();
  let year = date.getFullYear();


  return `${day} ${month} ${numberDay} ${year} ${hours}:${minutes}${amOrPm}`;
}

function displayDailyForecast() {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = `
    <div class="row">
      <div class="col-2">
        <div class="daily-forecast-date">Day 1</div>
        <img
          src="https://openweathermap.org/img/wn/03d@2x.png"
          alt="icon1"
          width="60"
         />
        <div class="daily-forecast-temperature">
          <span class="daily-forecast-temperature-max"> 22° </span> |
          <span class="daily-forecast-temperature-min"> 14° </span>
        </div>
      </div>
    </div>
  `;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#location-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//search city
function search(city) {
  let apiKey = "6f65ac3695a44ef64022cd653378b553";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//clicking current button update temp real time base on location

function searchLocation(position) {
  let apiKey = "6f65ac3695a44ef64022cd653378b553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metrics`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//temp conversion
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Seattle");
displayDailyForecast();







