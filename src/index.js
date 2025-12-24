function searchCity(city) {
  event.preventDefault();
  let inputElement = document.querySelector("#search-form-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = inputElement.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);
