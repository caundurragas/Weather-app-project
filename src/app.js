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
  celsiusTemperature = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#description");

  weatherDescription.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#windInfo");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let feels_like = document.querySelector("#realFeel");
  feels_like.innerHTML = Math.round(response.data.main.feels_like);
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconWeather = document.querySelector("#iconWeather");
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function serchToGetApi(city) {
  let apiKey = "3ec7bf82a84873e82215df15af12d134";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCity(event) {
  event.preventDefault();
  let searchForACity = document.querySelector("#searchSquare-input");
  serchToGetApi(searchForACity.value);
}

let searchForm = document.querySelector("#searchBar");
searchForm.addEventListener("submit", getCity);

function getForecast(coordinates) {
  let apiKey = "3ec7bf82a84873e82215df15af12d134";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}

function displayDailyForecast(response) {
  let forecast = response.data.daily;
  let dailyForecast = document.querySelector("#daily-forecast");
  let dailyForecastHTML = `<div class= "row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      dailyForecastHTML =
        dailyForecastHTML +
        `<div class="col-2">
                    <div class="day">
                        ${formatDay(forecastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }.png" alt="" class="weatherForecastIcon" />
                    <div class="weatherForecastMaxTemperature">
                        Max${Math.round(forecastDay.temp.max)}º
                    </div>

                    <div class="weatherForecastMinTemperature">
                        Min ${Math.round(forecastDay.temp.min)}º
                    </div>


                </div>`;
    }
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecast.innerHTML = dailyForecastHTML;
}

serchToGetApi("London");
