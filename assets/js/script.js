// Move the API key to the top of your script
var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2';

$("#search-form").on("submit", function (event) {
  event.preventDefault();

  var cityName = $("#search-input").val().trim();
  console.log("City Name:", cityName);

  // Once I received the city name from the user I call the getWeatherData function with the cityName
  getWeatherData(cityName);

  // Then Iclear the search input
  $("#search-input").val("");
});

// Function to fetch the weather data from OpenWeatherMap API based on the city name
function getWeatherData(cityName) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
  console.log("Query URL:", queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    displayWeatherInfo(response);
    //saveSearchHistory(cityName);
  });
}
  

// Function to display weather information on the page
function displayWeatherInfo(weatherData) {
  var currentWeather = weatherData.list[0];

  $("#today").html("<h2>" + weatherData.city.name + "</h2>");
  $("#today").append("<p>Date: " + currentWeather.dt_txt + "</p>");
  var iconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
  $("#today").append("<img src='" + iconUrl + "' alt='Weather Icon'>");
  $("#today").append("<p>Temperature: " + currentWeather.main.temp + " °C</p>");
  $("#today").append("<p>Humidity: " + currentWeather.main.humidity + "%</p>");
  $("#today").append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

  // I need a loop to run through the 5-day data received 

  for (var i = 1; i <= 5; i++) {
    var forecast = weatherData.list[i];
    var forecastDate = forecast.dt_txt;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";

    // Here I display the forecast information for each day

    $("#forecast").append("<div class='col-md-2 forecast-day'>");
    $("#forecast").append("<p>Date: " + forecastDate + "</p>");
    $("#forecast").append("<img src='" + forecastIconUrl + "' alt='Weather Icon'>");
    $("#forecast").append("<p>Temperature: " + forecast.main.temp + " °C</p>");
    $("#forecast").append("<p>Humidity: " + forecast.main.humidity + "%</p>");
    $("#forecast").append("</div>");
  }
}

