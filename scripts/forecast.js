// KEY for using api
const KEY = "kJ92Dq6NJlNiGqEBt7PndfZFOjcZcBqP";

// getting weather based on passed id of city
const getWeather = async (id) => {
  // constants
  const API = "http://dataservice.accuweather.com/currentconditions/v1/";
  const QUERY = `${id}?apikey=${KEY}`;

  // api call response promises
  const response = await fetch(API + QUERY);
  const cities = await response.json();

  // returning the first city
  return cities[0];
};

// getting city id based on city name
const getCityId = async (city) => {
  // constants
  const API = "http://dataservice.accuweather.com/locations/v1/cities/search/";
  const QUERY = `?apikey=${KEY}&q=${city}`;

  // response promises
  const response = await fetch(API + QUERY);
  const cities = await response.json();

  // returning the first city
  return cities[0];
};
