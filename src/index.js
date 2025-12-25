function formatDate(date) {
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = day[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay} ${hour}:${minutes}`;
}

function updateWeather(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector(
    "#current-temperature-number"
  );
  let temperature = Math.round(response.data.temperature.current);
  let descriptionWeather = document.querySelector("#descripton-weather");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentWeatherEmoji = document.querySelector("#emoji");
  let currentDate = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = temperature;
  descriptionWeather.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWind.innerHTML = response.data.wind.speed;
  currentWeatherEmoji.innerHTML = `<img
              src= "${response.data.condition.icon_url}"  alt=""
          />`;
  currentDate.innerHTML = formatDate(date);
}

function searchCity(city) {
  let apiKey = "90303e49ba1c9f82cb5tf7o1afec334c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-form-input");
  searchCity(inputElement.value);
}

function weatherForecast() {
  let weatherForecastELement = document.querySelector("#weather-forecast");
  weatherForecastELement.innerHTML = `
  <div class="forecast">
    <div>
      <div class="forecast-day">Tue</div>
      <div class="forecast-image">
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
          alt=""
        />
      </div>
      <div class="forecast-temperatures">
        <div class="forecast-temperature">
          <strong>2°</strong>
        </div>
        <div class="forecast-temperature">0°</div>
      </div>
    </div>
  </div>;
`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Copenhagen");
weatherForecast();
