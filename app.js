import * as ELEMENTS from './elements.js';
import { http } from './http.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data.js';
import { kleisli } from './kleisli.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function updateWeatherInterface(jsonData) {
    console.log(jsonData);
}

function errorOut(errorMessage) {
    console.log(errorMessage);
}

const APP_ID = "3ffbb4d7c4c147eeecb26ca4e8b337c0";

function searchWeather() {
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    const MAYBE_CITY_WEATHER =
          Maybe.fromFalsy(CITY_NAME)
               .map((cityName) => 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&units=metric&appid=" + APP_ID) // make the url.
               .map((url) => {
                   kleisli(http.fetchData)
                       .pipeTo((weatherData) => {
                           const WEATHER_DATA = new WeatherData(CITY_NAME, weatherData.weather[0].description);
                           const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
                           WEATHER_PROXY.temperature = weatherData.main.temp;
                           return WEATHER_DATA;
                       })
                       .run(url)
                       .then(updateWeatherInterface)
                       .catch(errorOut);
               });

    // Here you can give an error message displaying the user.
    MAYBE_CITY_WEATHER.orElseRun(() => alert("Field is empty."));
}
