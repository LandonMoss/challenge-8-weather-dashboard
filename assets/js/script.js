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
// -------------------------------------------------------------------------------

var APIkey = "9a1ef4b357aa8b1ab5a4fce1c51a6966";
var searchInput = "";
var todayCard = $('#today');
var fiveDayForecast = $('#forecast');
var searchHistory = [];



// put into separate functions rather than within click event?

// ON SEARCH CLICK DISPLAY RESULTS
// $('#search-button').on('click', function (event) {

//     //prevent default action
//     event.preventDefault();

//     // clear previous searches on screen otherwise it repeats


//     // get search value & set URL for geocoding API 
//     var searchInput = $('#search-input').val();
//     var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + APIkey;

//     // add search term to list of buttons to allow users to search for that city again
//     addToButtons()


//     // GET LATITUDE & LONGITUDE FOR CITY
//     $.ajax({
//         url: geoQueryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);

//         // NEED TO ADD AN MSG FOR IF THE CITY ENTERED DOESN'T EXIST

//         // get lon/lat, reduce to 2 decimals and update openweathermap API url
//         var lon = response[0].lon.toFixed(2);
//         var lat = response[0].lat.toFixed(2);
//         var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=40&appid=" + APIkey;

//         // get weather for city
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);

//             var todayDiv = $('<div>').attr('class', "card p-4");;

//             // FIGURES FOR CURRENT DAY
//             // city name and date (using moment to remove time stamp)
//             var cityNameAndDate = $('<h2>').text(
//                 response.city.name + " (" + 
//                 moment(response.list[0].dt_txt).format('DD/MM/YY') + ")"
//                 );

//             // icon

//             // temp in C (kelvin -273.15 = C)
//             var todaysTemp = $('<p>').text("Temp: " + (response.list[0].main.temp_max - 273.15).toFixed(2) + " °C");

//             // wind speed in KPH
//             var todayWind = $('<p>').text("Wind: " + response.list[0].wind.speed + " KPH");

//             // humidity percentage
//             var todayHumidity = $('<p>').text("Humidity: " + response.list[0].main.humidity + "%");

//             // append all items
//             todayCard.append(todayDiv);
//             todayDiv.append(cityNameAndDate, todaysTemp, todayWind, todayHumidity);


//             // get forecast for next 5 days
//             // --------------------------------------------

//             // each day is 8 x 3 hr
//             for (i = 8; i < response.list.length; i++) {

//                 var forecastDiv = $('<div>').attr('class', "card m-3");
//                 var forecastCard = $('<div>').attr('class', "card-body");

//                 //date
//                 var date = $('<h5>').text(moment(response.list[i].dt_txt).format('DD/MM/YY'));
//                 date.attr('class', 'card-title');

//                 // icon

//                 // temp
//                 var temp = $('<p>').text("Temp: " + (response.list[i].main.temp_max - 273.15).toFixed(2) + " °C");

//                 // speed
//                 var windSpeed = $('<p>').text("Wind: " + response.list[i].wind.speed + " KPH");

//                 // humidity
//                 var humidity = $('<p>').text("Humidity: " + response.list[i].main.humidity + "%");

//                 fiveDayForecast.append(forecastDiv);
//                 forecastDiv.append(forecastCard);
//                 forecastCard.append(date, temp, windSpeed, humidity);

//                 // add 7 to get to the next day (instead of 8 as the loop already adds 1)
//                 i = i + 6; // changed to 6 as wasn't picking up 5th day, check this
//             }

//         });

//     });

// });


$('#search-button').on('click', function (event) {

    //prevent default action
    event.preventDefault();

    // grab input val & get weather data
    searchInput = $('#search-input').val();
    getWeather();

    // add to buttons to allow users to search for that city again
    addToButtons();

});


function getWeather() {

    // clear previous searches on screen otherwise it repeats
    todayCard.empty();
    fiveDayForecast.empty();

    // get search value & set URL for geocoding API 

    var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=5&appid=" + APIkey;

    // GET LATITUDE & LONGITUDE FOR CITY
    $.ajax({
        url: geoQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // NEED TO ADD AN MSG FOR IF THE CITY ENTERED DOESN'T EXIST

        // get lon/lat, reduce to 2 decimals and update openweathermap API url
        var lon = response[0].lon.toFixed(2);
        var lat = response[0].lat.toFixed(2);
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=40&appid=" + APIkey;

        // get weather for city
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var todayDiv = $('<div>').attr('class', "card p-4");;

            // FIGURES FOR CURRENT DAY
            // city name and date (using moment to remove time stamp)
            var cityNameAndDate = $('<h2>').text(
                response.city.name + " (" +
                moment(response.list[0].dt_txt).format('DD/MM/YY') + ")"
            );

            // icon

            // temp in C (kelvin -273.15 = C)
            var todaysTemp = $('<p>').text("Temp: " + (response.list[0].main.temp_max - 273.15).toFixed(2) + " °C");

            // wind speed in KPH
            var todayWind = $('<p>').text("Wind: " + response.list[0].wind.speed + " KPH");

            // humidity percentage
            var todayHumidity = $('<p>').text("Humidity: " + response.list[0].main.humidity + "%");

            // append all items
            todayCard.append(todayDiv);
            todayDiv.append(cityNameAndDate, todaysTemp, todayWind, todayHumidity);



            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                // get forecast for next 5 days

                // each day is 8 x 3 hr
                for (i = 8; i < response.list.length; i++) {

                    var forecastDiv = $('<div>').attr('class', "card m-3");
                    var forecastCard = $('<div>').attr('class', "card-body");

                    //date
                    var date = $('<h5>').text(moment(response.list[i].dt_txt).format('DD/MM/YY'));
                    date.attr('class', 'card-title');

                    // icon

                    // temp
                    var temp = $('<p>').text("Temp: " + (response.list[i].main.temp_max - 273.15).toFixed(2) + " °C");

                    // speed
                    var windSpeed = $('<p>').text("Wind: " + response.list[i].wind.speed + " KPH");

                    // humidity
                    var humidity = $('<p>').text("Humidity: " + response.list[i].main.humidity + "%");

                    fiveDayForecast.append(forecastDiv);
                    forecastDiv.append(forecastCard);
                    forecastCard.append(date, temp, windSpeed, humidity);

                    // add 7 to get to the next day (instead of 8 as the loop already adds 1)
                    i = i + 6; // changed to 6 as wasn't picking up 5th day, check this
                }

            })
        });
    });
};



// local storage (add a clear history button?)

// generate buttons
// append button items (preappend search history city?)

function addToButtons() {

    var input = $('#search-input').val();

    var button = $('<button>').text(input);
    button.attr({
        class: 'search-history mb-3',
        "data-name": input
    });

    $('.list-group').append(button);

    // add to local storage and search terms array
    searchHistory.push(input);
    localStorage.setItem("search-term", JSON.stringify(searchHistory));

};


// get specific cities weather when button clicked

$(document).on("click", ".search-history", function (event) {
    searchInput = $(this).attr("data-name");
    getWeather();
});



// render buttons from local storage

function renderButtons() {

    storageSearchHistory = JSON.parse(localStorage.getItem("search-term"));

    if (storageSearchHistory === null) {
        searchHistory = [];
        
    } else {
        searchHistory = storageSearchHistory;

        for (i = 0; i < searchHistory.length; i++) {

            var button = $('<button>').text(searchHistory[i]);

            button.attr({
                class: 'search-history mb-3',
                "data-name": searchHistory[i]
            });

            $('.list-group').append(button);
        }
    }
};

renderButtons();


// $('#clear-history').on("click", function (event) {
//     searchHistory = [];
//     localStorage.removeItem("search-term");
//     $('.list-group').empty();
// });