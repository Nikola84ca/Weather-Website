

    $("#search-form").on("submit", function (event) {
      event.preventDefault();

      var cityName = $("#search-input").val().trim();
  
      $("#search-input").val("");
    });
  
    // Function to fetch the weather data from OpenWeatherMap API based on the city name
    function getWeatherData(cityName) {
      var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2'; 
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
   
    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        displayWeatherInfo(response);
        saveSearchHistory(cityName);
      });
    }
  