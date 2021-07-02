function formatDate(date) {

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
  let months = ["January", "Febuary", "March","April","May","June","July","August","September","October","November","December"];
  let month = months[monthIndex];
  let numberDay = date.getDate();
  let year = date.getFullYear();

  return `${day} ${month} ${numberDay}, ${year}`;
}

let dateElement = document.querySelector("#date");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);


//Current Time in Main box
function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}





// display the current weather detail
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather.main;


  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

//When someone search in bar the city will replace h2 and updates temp real time
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

// changing F and C with click need to figure out how to replace 14 in line 101 with search

function displayFahrenheit(event){
  event.preventDefault();
  let tempatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
  tempatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//globally variables

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);



//default view when on page
searchCity("Seattle");
