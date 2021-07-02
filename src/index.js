//Toggle Menu
const menuToggle = document.querySelector('.toggle');
const main = document.querySelector('.main');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  main.classList.toggle('active');
})


//timestamp date & time
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
  let months = [
    "January", 
    "Febuary", 
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];
  let month = months[monthIndex];
  
  return `${day} ${month} ${hours}:${minutes}${amOrPm}`;
}

let dateElement = document.querySelector("#date-time");
dateElement.innerHTML = formatDate(response.data.dt * 1000);


// display the current weather detail
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;


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
