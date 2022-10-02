"use strict";

// Dom elements
const formEl = document.querySelector("#change-city");
const contentEl = document.querySelector(".content");
const detailsEl = document.querySelector("#details");
const imgWrapper = document.querySelector(".status-img");

// update ui
const updateUi = (data) => {
  const { cityDetails, cityWeather } = data;

  // updating ui deatils
  detailsEl.innerHTML = `
    <h4 id="city-name">${cityDetails.AdministrativeArea.EnglishName}</h4>
    <p class="temp">
      <span id="city-temp">${Math.floor(
        cityWeather.Temperature.Metric.Value
      )}</span>
      <span>°C</span>
    </p>
    <p class="info">${cityWeather.WeatherText}</p>
  `;

  // checking the time
  let time = cityWeather.IsDayTime ? "day" : "night";

  // updating images
  imgWrapper.innerHTML = `
    <img src="./images/${time}.svg" alt="city status" id="city-img" />
    <img class="weather-icon" src="./images/icons/${cityWeather.WeatherIcon}.svg" alt="cloud" />
  `;

  // unhide the details wrapper on ui
  contentEl.classList.add("active");
};

// fetch data from api
const updateCity = async (city) => {
  // getting uniq id of city
  const cityDetails = await getCityId(city);

  // passing id to get weather details
  const cityWeather = await getWeather(cityDetails.Key);

  // returning an object from both api
  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather
  };
};

// eventlistner for search input sumbit event
formEl.addEventListener("submit", (e) => {
  // prevent browser refresh
  e.preventDefault();
  contentEl.classList.remove("active");

  // get value from input
  let city = formEl.cityInput.value.trim();
  formEl.reset();

  // handle search functionalty

  // fetch city weather
  updateCity(city)
    .then((data) => {
      // show fetched data on ui
      updateUi(data);
    })
    .catch((error) => console.log(error));
});
