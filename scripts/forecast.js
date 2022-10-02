class Forecast {
  constructor() {
    this.key = "z8zq9nrdR3J7ykQD5k1qJhpCuxwxEuVs";
    this.weatherURL =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    // getting uniq id of city
    const cityDetails = await this.getCityId(city);

    // passing id to get weather details
    const cityWeather = await this.getWeather(cityDetails.Key);

    // returning an object from both api
    return {
      cityDetails,
      cityWeather
    };
  }

  async getCityId(city) {
    // constants
    const QUERY = `?apikey=${this.key}&q=${city}`;

    // response promises
    const response = await fetch(this.cityURL + QUERY);
    const cities = await response.json();

    // returning the first city
    return cities[0];
  }

  async getWeather(id) {
    // constants
    const QUERY = `${id}?apikey=${this.key}`;

    // api call response promises
    const response = await fetch(this.weatherURL + QUERY);
    const cities = await response.json();

    // returning the first city
    return cities[0];
  }
}

export { Forecast };
