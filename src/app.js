function displayTemperature(response) {
  console.log(response.data);
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
  let maxTemperature = document.querySelector("#maxTemperature");
  maxTemperature.innerHTML = Math.round(response.data.main.temp_max);
}

let apiKey = "3ec7bf82a84873e82215df15af12d134";
let apiCity = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=metric&appid=${apiKey}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
