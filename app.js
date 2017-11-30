import * as ELEMENTS from './elements.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather(cityName) {
}

function failtJsonFetch(failureError) {
    console.log('There has been an error in the api: ' + failure);
}

function searchWeather() {
    const MAYBE_CITY_WEATHER =
          Maybe.fromFalsy(ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim())
               .bind((cityName) => {
                   console.log('Do search request!');
                   return Either.Left("Error connecting to api...");
               })
               .cata((failure) => {
                   // here you can log an error message to the log files.
                   console.log("City not found, error message: " + failure);
                   return Maybe.none();
               }, (success) => {
                   console.log(success);
                   return Maybe.some(success);
               });

    // Here you can give an error message displaying the user.
    MAYBE_CITY_WEATHER.orElseRun(() => alert("There has been an error."));
}
