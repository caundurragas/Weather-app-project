function formatDate(timeStamp) {
  let date = new Date(timeStamp);
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
  let hour = date.getHours();

  let minutes = date.getMinutes();

  let numberDay = date.getDate();

  return `${day} ${numberDay}, ${hour}:${minutes}`;
}

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let realFeel = document.querySelector("#feelsLike");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let minTemperature = document.querySelector("#minTemperature");
  minTemperature.innerHTML = Math.round(response.data.main.temp_min);
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconWeather = document.querySelector("#iconWeather");
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "3ec7bf82a84873e82215df15af12d134";
let apiCity = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
