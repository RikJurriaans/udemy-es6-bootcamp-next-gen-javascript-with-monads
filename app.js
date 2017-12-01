import * as ELEMENTS from './elements.js';
import http from './http.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function updateField(jsonData) {
    console.log(jsonData);
}

function errorOut(errorMessage) {
    console.log(errorMessage);
}

function searchWeather() {
    const MAYBE_CITY_WEATHER =
          Maybe.fromFalsy(ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim())
               .map((cityName) => 'www.rikkie.nl/' + cityName) // make the url.
               .map((url) =>
                        http.fetchData(url)
                            .then(updateField)
                            .catch(errorOut));

        // Here you can give an error message displaying the user.
        MAYBE_CITY_WEATHER.orElseRun(() => alert("There has been an error."));
    }
