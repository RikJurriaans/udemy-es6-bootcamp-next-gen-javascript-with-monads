import * as ELEMENTS from './elements.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const CITY_NAME =
          Maybe.fromFalsy(ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim())
               // Dit is een Kleisli... fucking awesome..
               .map((cityName) => {
                   console.log('Do search request!');
                   return cityName;
               });
    CITY_NAME.orElseRun(() => alert("Not a city name"));
}
