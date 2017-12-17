import * as ELEMENTS from './elements.js';
import { GETRequest } from './http.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data.js';
import { kleisli } from './kleisli.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function updateWeatherInterface(weatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
}

function errorOut(httpStatus) {
    console.log("The api responded with something different than 200:" + httpStatus);
}

const APP_ID = "3ffbb4d7c4c147eeecb26ca4e8b337c0";

let cityNameToAPIUrl = cityName =>
    'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&units=metric&appid=" + APP_ID;

const setAttr = x => (attr, val) => x[attr] = val;

let weatherJsonToWeatherData = cityName => weatherData => {
    const WEATHER_DATA = new WeatherData(cityName, weatherData.weather[0].description);
    const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
    WEATHER_PROXY.temperature = weatherData.main.temp;
    return WEATHER_DATA;
};

function searchWeather() {
    // Dit is nog een beetje imperative.
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';

    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();

    // Ik kan hier monad transformers voor gebruiken denk ik.
    const MAYBE_CITY_WEATHER =
        Maybe
        .fromFalsy(CITY_NAME)
        .toEither(() => alert("Field is empty."))
        .map(cityNameToAPIUrl)
        .map(GETRequest)
        .map(t =>
             t.map(weatherJsonToWeatherData(CITY_NAME))
             .fork(errorOut,
                   updateWeatherInterface));
}
