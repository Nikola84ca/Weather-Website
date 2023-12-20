# Weather-Website
Weather website that uses API to perform user searches based on towns

![Gif animation of how to use the Password Generator website](/assets/images/Weather-Dashboard.gif)

## About Me 
Born and raised in Italy, I moved to the UK in 2015. I have always been interested in new technologies and IT, as I studied IT in my A levels back in Italy. After 5 years working in content management for a website, I decided to make the step of learning Front-End Development thanks to the edX course, and on my gitHub profile I showcase not only my progress in Front-End Development as a student but also a journey that hopefully will lead to new exciting projects in this field.

## Usage

You can visit the JavaScript Quiz Game website by clicking [HERE](https://nikola84ca.github.io/Weather-Website/). Alternatively to the url above, you can clone the repository on your device as shown in the Installation section below and access the index.html file by opening it in your browser. Here is a gif animation of the step-by-step procedure to search for the weather forecast for a specific city:

![Gif animation of how to use the Password Generator website](/assets/images/Weather-Dashboard.gif)

## Installation
First, make sure that Git and Git Bash are installed on your system. To download this project on your machine click [HERE](https://github.com/Nikola84ca/Weather-Website) to go to the repository on GitHub. Click on the green CODE button, and copy the link of the repository. In your machine, open gitBash and create a new folder where you will clone the project using the command below:

```bash
Git mkdir your-project-folder
```
navigate inside the new folder, and clone the project files with the following comands

```bash
cd your-project-folder
Git clone url-copied-on-repository
git pull
```

Open your editor with the command

```bash
code .
```

alternatively download the zip file in GitHub after pressing the Code button, unzip it and copy it in your project folder. Navigate to the folder using the cd command on gitbash and lounch your editor as shown above with "code ." to open the Weather Website page simply open the index.html file on your browser and follow the procedure as shown in the following animation:


## Website Description 

The website is a one-page site that will use JavaScript, jQuery, and APIs to create a weather website that will allow users to input the name of a city and retrive the weather forecast for the current day and for the five days after. Every time a new city is searched, the page will refresh the screen view, and add a new button with the name of the new city. The button will allow the user to retrive quickly the data of each city of interest, by keeping the buttons in the local storage. Every time the user presses that button the user will show the updated forecast for that location. I included also a button to clear the search history, this will delete all city buttons created and allows the user to start a brand new search.

![Gif animation of how to use the Password Generator website](/assets/images/Weather-Dashboard.gif)

## My Process

* The first thing I did was creating an API Key with the openweathermap.org website and added to the apiKey variable. Then I created submit event that will retrive the user's city input, saved in the cityName variable. This is fundamental to create the fetch request to the openweathermap.org website. Here is the code, as you can see, once I have the cityName and apiKey, I can call the getWheaterData and createCityButton functions:

```JavaScript
var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2';

$("#search-form").on("submit", function (event) {
  event.preventDefault();
  var cityName = $("#search-input").val().trim();
  console.log("City Name:", cityName);
  getWeatherData(cityName);
  createCityButton(cityName);
  $("#search-input").val("");
});
```

* Then I created a function to fetch the weather data from OpenWeatherMap API based on the city name. Once we get the dataset we call the displayWeatherInfo function

```JavaScript
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
```

* The next step was to create a function to display the weather information on the page. Since this was a complex function I decided to divide it into several parts. In the first part I focused on the current day of the search, as it will show in a bigger container above the five other days. The first thing I do is to clear the existing content in the #today and #forecast elements so that only the current search or the city button pressed shows on the screen. Then I chose to focus on wrapping the content for the first day of the search (the current day) in a container, as I want to show the current day on top in a bigger container while the other 5 days in smaller ones below. Finally I  created the containers and append the content for the first day to the #today element of the html. Here is the code for this first part of the function:

```JavaScript
function displayWeatherInfo(weatherData) {
 
  $("#today").empty();
  $("#forecast").empty();

  var currentWeather = weatherData.list[0];

  var $firstDayContainer = $("<div class='first-day-container'>");

  
  $firstDayContainer.append("<h2>" + weatherData.city.name + "</h2>");
  $firstDayContainer.append("<p>Date: " + currentWeather.dt_txt + "</p>");
  var iconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
  $firstDayContainer.append("<img src='" + iconUrl + "' alt='Weather Icon'>");
  $firstDayContainer.append("<p>Temperature: " + currentWeather.main.temp + " °C</p>");
  $firstDayContainer.append("<p>Humidity: " + currentWeather.main.humidity + "%</p>");
  $firstDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

  
  $("#today").append($firstDayContainer);
```

* In the second part of the function I focused on the 5 days forecast. I need to create a row container for the other 5 days data I retrived with a for loop. Then I create a container for each forecast day and append the content for each forecast day to its relative container. Then I appended the forecast day container to the forecast row and appended it to the relative html #forecast element. Here is the code for this final part of the displayWeatherInfo function:

```JavaScript
  var $forecastRow = $("<div class='row' id='forecast-row'>");

  for (var i = 0; i < 5; i++) {
    var forecast = weatherData.list[i * 8];
    var forecastDate = forecast.dt_txt;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";


    var $forecastDayContainer = $("<div class='col-md-2 col-sm-6 forecast-day'>");

    $forecastDayContainer.append("<p>Date: " + forecastDate + "</p>");
    $forecastDayContainer.append("<img src='" + forecastIconUrl + "' alt='Weather Icon'>");
    $forecastDayContainer.append("<p>Temperature: " + forecast.main.temp + " °C</p>");
    $forecastDayContainer.append("<p>Humidity: " + forecast.main.humidity + "%</p>");
    $forecastDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

    $forecastRow.append($forecastDayContainer);
  }

  $("#forecast").html($forecastRow); 
}
```

* The next step was to create a button for the searched city, the buttons will remain in the internal storage untill deleted, and will allow users to perform a quick, updated search based on the city name. In the createCityButton function I create a button element if it doesn't exist already, I used the find function in the if statement to check if the button already existed. If the city button doesn't exist already in the history, I create the button, then I set the button text and class and append the button to the history container. After that I need to save it in the search history, so I call the function saveSearchHistory. Finally I attach the click event to the button to display weather information so that when the button is clicked it will call the getWeatherData function to display the updated city forecast.

```JavaScript
function createCityButton(cityName) {
 

  if ($("#history").find(".city-button:contains('" + cityName + "')").length === 0) {
    var $cityButton = $("<button>");

    $cityButton.text(cityName);
    $cityButton.addClass("city-button");
    $("#history").append($cityButton);

    saveSearchHistory(cityName);

     $cityButton.on("click", function () {
      getWeatherData(cityName);
    });
  }
}
```

* At this point I need to save the search history, to do so I created this function to save the city name in the local storage.

```JavaScript

function saveSearchHistory(cityName) {
 
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  searchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

```  

* After I saved the updated search history, I created a function to load it and display it. It was important to avoid duplicates, in case the user searches the same city twice. I used a forEach loop to go through the search history

```JavaScript

function loadSearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var uniqueCities = [...new Set(searchHistory)]; 
  uniqueCities.forEach(function (cityName) {
    createCityButton(cityName);
  });
}

 loadSearchHistory();

``` 


* To complete the website I decided to add a button to clear search history, this wasn't required but I thought it would help the user to start a brand new seach and button list. First thing after the click event is to clear the search history from local storage. After that I have to clear the buttons in the history container and clear all the displayed weather information.

```JavaScript
 loadSearchHistory();

$("#clear-history").on("click", function () {

  localStorage.removeItem("searchHistory");

  $("#history").empty();

   $("#today").empty();
   $("#forecast").empty();
});

``` 


## Credits

I would like to thank all the teachers and TA of the EdX bootcamp for all the content provided and study materials.

## Project Status and Upcoming Improvements

The Webpage is functional and easy to navigate, the user can search for a city by name and view the relative weather forecast for the current day and for the five weeks after. Once the user performs a search, a new button is created that will be saved in the internal storage and will allow the user, by pressing it, to perform an updated search relative to that city. The clear history button works as intended and clears all the data from the internal storage. There are some improvements to be done in the layout, so the next step will involve a better set up and implementation through the CSS styling.

## Collaborations and Contributions

I welcome all the brilliant coders out there to join me in this project. Join effort can result in a fundamental learning experience for a beginner coder like me, so feel free to reach out with tips and advice. If you want to contribute to this project, pull requests are welcome, but if you want to make major changes, please open an issue first so that we can discuss what you would like to change. You can contact me on my GitHub profile [HERE](https://github.com/Nikola84ca) and visit this project repository by clicking [HERE](https://github.com/Nikola84ca/Weather-Website).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## License

[MIT](https://choosealicense.com/licenses/mit/)
