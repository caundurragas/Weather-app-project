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
  let realFeel = document.querySelector("#feelsLike");
  realFeel.innerHTML = Math.round(response.data.wind.speed);
  let minTemperature = document.querySelector("#minTemperature");
  minTemperature.innerHTML = Math.round(response.data.main.humidity);
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconWeather = document.querySelector("#iconWeather");
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrenheit(event) {
  event.preventDefault;
  let getFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(getFahrenheit);
}

function displayCelsius(event) {
  event.preventDefault;
  let currentTemperature = document.querySelector("#currentTemperature");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let fahrenheit = document.querySelector("#far");
fahrenheit.addEventListener("click", displayFahrenheit);

let celcius = document.querySelector("#celsius");
celcius.addEventListener("click", displayCelsius);

function displayDailyForecast() {
  let dailyForecast = document.querySelector("#daily-forecast");
  let dailyForecastHTML = `<div class= "row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    dailyForecastHTML =
      dailyForecastHTML +
      `<div class="col-2">
                    <div class="day">
                        ${day}
                    </div>
                    <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" class="weatherForecastIcon" />
                    <div class="weatherForecastMaxTemperature">
                        Max23ºC
                    </div>

                    <div class="weatherForecastMinTemperature">
                        Min9ºC
                    </div>


                </div>`;
  });

  dailyForecastHTML = dailyForecastHTML + `</div>`;
  dailyForecast.innerHTML = dailyForecastHTML;
}

displayDailyForecast();
serchToGetApi("London");
