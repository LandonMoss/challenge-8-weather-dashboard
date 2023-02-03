// PSEUDEOCODE

/*

geocoding API - we'll have to use that link first as it will allow the city name in the title and then that gives you the lat/long

then add the lat/long into the weather API url which contains the long/lat and use to populate the page

it will give you more than the five days

Doesn't have to match the example styling, just has to be clean and polished

will need to have a for loop to populate the days


when searching a city, that city should be added as a button as soon as search is clicked

this list needs to be stored in local storage so that it stays after page refresh

when button clicked, it loads the weather the same as if they had searched for it

the icons can be get from the weather API itself (link in slack)
once we've got the weather data, it's in weather.icon and then get the code from their site to add to a unique url that points to the right icon


*/

/*

Search field on click starts .ajax

Search input is added to local storage and a button below

Weather displayed should be: 

 - Current day
    - city name, date & icon
    - temp in C
    - wind speed in KPH
    - humidity percentage

 - next 5 days
    - date
    - weather icon
    - temp in C
    - wind speed in KPH
    - humidity percentage

*/


// URLs

// base URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// example API call: api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}

// Geocoding URL: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// Geocoding example: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

// base icon url: "http://openweathermap.org/img/w/" + iconcode + ".png"



// local storage (add a clear history button?)


// append items (preappend search history city)

var APIkey = "9a1ef4b357aa8b1ab5a4fce1c51a6966";




// ajax

// get geocoder
var geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" + APIkey;

$.ajax({
    url: geoQueryURL,
    method: "GET"
}).then(function (response) {
console.log(response);

 var long = response[0].lon;
var lat = response[0].lat;

});

// get weather api