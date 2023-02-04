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


error on github, this is the fix you put that the top: <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">


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



// MY CODE
// ----------------------------------------------------------------------

var APIkey = "9a1ef4b357aa8b1ab5a4fce1c51a6966";

// put into separate functions rather than within click event?7

// ON SEARCH CLICK DISPLAY RESULTS
$('#search-button').on('click', function (event) {

    //prevent default action
    event.preventDefault();

    // get search value
    var searchInput = $('#search-input').val();

    // set url for geocoding API   
    var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + APIkey;

    // GET LATITUDE & LONGITUDE FOR CITY
    $.ajax({
        url: geoQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // NEED TO ADD AN MSG FOR IF THE CITY ENTERED DOESN'T EXIST

        // get lon/lat and reduce to 2 decimals
        var lon = response[0].lon.toFixed(2);
        var lat = response[0].lat.toFixed(2);

        // update openweathermap API url with lon/lat
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=40&appid=" + APIkey;

        // get weather for city
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // FIGURES FOR CURRENT DAY
            // city name
            console.log(response.city.name);

            // date
            var curentDate = moment(response.list[0].dt_txt).format('DD/MM/YY');
            console.log(curentDate); // show only date with moment

            // icon

            // temp in C (kelvin -273.15 = C)
            var todaysTemp = response.list[0].main.temp_max - 273.15;
            console.log(todaysTemp.toFixed(2));

            // wind speed in KPH
            console.log(response.list[0].wind.speed);

            // humidity percentage
            console.log(response.list[0].main.humidity);


            // run function for next 5 days
            // each day is 8 x 3 hr
            for (i = 8; i < response.list.length; i++) {

                //date
                var date = moment(response.list[i].dt_txt).format('DD/MM/YY');
                console.log(date);

                // icon

                // temp
                var fiveDayTemp = response.list[i].main.temp_max - 273.15;
                console.log(fiveDayTemp.toFixed(2));

                // speed
                console.log(response.list[i].wind.speed);

                // humidity
                console.log(response.list[i].main.humidity);

                // add 7 to get to the next day (instead of 8 as the loop already adds 1)
                i = i + 7;
            }

        });

    });

});

// local storage (add a clear history button?)

// generate buttons
// append button items (preappend search history city?)
