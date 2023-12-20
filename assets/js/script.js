// This is my API key
var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2';

// the following is an event listener so that when the search form button is clicked we get the user input for the name of the city, then we can call the Function to fetch the weather data from OpenWeatherMap and the createCityButton to create a city button

$("#search-form").on("submit", function (event) {
  event.preventDefault();

  var cityName = $("#search-input").val().trim();
  console.log("City Name:", cityName);

  // Once I received the city name from the user I call the getWeatherData and createCityButton functions with the cityName
  getWeatherData(cityName);
    // Append a button for the searched city
    createCityButton(cityName);

  // Then Iclear the search input
  $("#search-input").val("");
});

// Function to fetch the weather data from OpenWeatherMap API based on the city name. Once we get the dataset we call the displayWeatherInfo function

function getWeatherData(cityName) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
  console.log("Query URL:", queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    displayWeatherInfo(response);
    
  });
}
  
// This is the function to display weather information on the page. It is divided into several parts

function displayWeatherInfo(weatherData) {
  // The first thing I do is to clear the existing content in the #today and #forecast elements so that only the current search or the city button pressed shows on the screen 

  $("#today").empty();
  $("#forecast").empty();

  var currentWeather = weatherData.list[0];

  // Then I chose to focus on wrapping the content for the first day of the search (the current day) in a container, as I want to show the current day on top in a bigger container while the other 5 days in smaller ones below 

  var $firstDayContainer = $("<div class='first-day-container'>");

  // Here I create the containers and append the content for the first day
  
  $firstDayContainer.append("<h2>" + weatherData.city.name + "</h2>");
  $firstDayContainer.append("<p>Date: " + currentWeather.dt_txt + "</p>");
  var iconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
  $firstDayContainer.append("<img src='" + iconUrl + "' alt='Weather Icon'>");
  $firstDayContainer.append("<p>Temperature: " + currentWeather.main.temp + " °C</p>");
  $firstDayContainer.append("<p>Humidity: " + currentWeather.main.humidity + "%</p>");
  $firstDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

  // The I append the containers to the #today element of the html

  $("#today").append($firstDayContainer);

  // At this stage I need to create a row container for the other 5 days forecast

  var $forecastRow = $("<div class='row' id='forecast-row'>");

  // To get the data, I loop through the 5-day forecast data starting from index 0

  for (var i = 0; i < 5; i++) {
    var forecast = weatherData.list[i * 8];
    var forecastDate = forecast.dt_txt;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";

    // Then I create a container for each forecast day and append the content for each forecast day to its container

    var $forecastDayContainer = $("<div class='col-md-2 col-sm-6 forecast-day'>");

    $forecastDayContainer.append("<p>Date: " + forecastDate + "</p>");
    $forecastDayContainer.append("<img src='" + forecastIconUrl + "' alt='Weather Icon'>");
    $forecastDayContainer.append("<p>Temperature: " + forecast.main.temp + " °C</p>");
    $forecastDayContainer.append("<p>Humidity: " + forecast.main.humidity + "%</p>");
    $forecastDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

    // Then I append the forecast day container to the forecast row
    $forecastRow.append($forecastDayContainer);
  }

  // Finally I append the forecast row to the #forecast element
  
  $("#forecast").html($forecastRow); 
}


// Function to create a button for the searched city
function createCityButton(cityName) {
  // Create a button element if it doesn't exist
  if ($("#history").find(".city-button:contains('" + cityName + "')").length === 0) {
    // Create a button element
    var $cityButton = $("<button>");

    // Set the button text and class
    $cityButton.text(cityName);
    $cityButton.addClass("city-button");

    // Append the button to the history container
    $("#history").append($cityButton);

    // Store the city name in local storage
    saveSearchHistory(cityName);

    // Attach click event to the button to display weather information
    $cityButton.on("click", function () {
      getWeatherData(cityName);
    });
  }
}

// Function to save the city name in local storage
function saveSearchHistory(cityName) {
  // Get the existing search history from local storage
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Add the new city name to the search history
  searchHistory.push(cityName);

  // Save the updated search history in local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Function to load search history from local storage and create buttons
function loadSearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var uniqueCities = [...new Set(searchHistory)]; // Remove duplicates

  // Loop through the search history and create buttons
  uniqueCities.forEach(function (cityName) {
    createCityButton(cityName);
  });
}

// Call the function to load search history on page load 
 loadSearchHistory();

// Add a button to clear search history
$("#clear-history").on("click", function () {
  // Clear the search history from local storage
  localStorage.removeItem("searchHistory");

  // Clear the buttons in the history container
  $("#history").empty();

   // Clear the displayed weather information
   $("#today").empty();
   $("#forecast").empty();
});
