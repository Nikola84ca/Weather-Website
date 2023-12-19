# Weather-Website
Weather website that uses API to perform user searches based on towns

![Gif animation of how to use the Password Generator website](/assets/images/Weather-Dashboard.gif)

## About Me 
Born and raised in Italy, I moved to the UK in 2015. I have always been interested in new technologies and IT, as I studied IT in my A levels back in Italy. After 5 years working in content management for a website, I decided to make the step of learning Front-End Development thanks to the edX course, and on my gitHub profile I showcase not only my progress in Front-End Development as a student but also a journey that hopefully will lead to new exciting projects in this field.

## Usage

You can visit the JavaScript Quiz Game website by clicking [HERE](https://nikola84ca.github.io/WorkDay-Scheduler/). Alternatively to the url above, you can clone the repository on your device as shown in the Installation section below and access the index.html file by opening it in your browser. Here is a gif animation of the step-by-step procedure to generate your password:

![Gif animation of how to use the Password Generator website](/assets/Images/Work-Day-Scheduler.gif)

## Installation
First, make sure that Git and Git Bash are installed on your system. To download this project on your machine click [HERE](https://github.com/Nikola84ca/WorkDay-Scheduler) to go to the repository on GitHub. Click on the green CODE button, and copy the link of the repository. In your machine, open gitBash and create a new folder where you will clone the project using the command below:

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

alternatively download the zip file in GitHub after pressing the Code button, unzip it and copy it in your project folder. Navigate to the folder using the cd command on gitbash and lounch your editor as shown above with code . To open the Work Day Scheduler page simply open the index.html file on your browser and follow the procedure as shown in the following animation:

![Gif animation of how to use the Password Generator website](/Assets/Images/password-generator-test-animation.gif)

## Website Description 

The website is a one-page site that will use JavaScript to create a work day schedule that will allow users to input notes in each hour field and save them. They will also be able to delete them by deleting the text and save again. All the input saved by the users will be stored in the local storage and reloaded if the page is refreshed.

## My Process

* The first thing that was required was to show the correct current date on top of the page, I implemented a function to do so, saving the current day in a variable using the dayjs and format function to format the date as required. Here is the code

```JavaScript
  function displayCurrentDay() {
  var currentDay = dayjs().format('dddd, MMMM D, YYYY');
  $("#currentDay").text(currentDay);
}
```

* Then I implemented a function that creates all the time blocks where that show the hours, and their relative input fields and the save buttons. To do that I created a for loop that runs through the hour index and defines the specific classes for each div, I also included the function to reload the user input from the global array when the page is loaded.

```JavaScript
function createTimeBlocks() {
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block");
      var hourCol = $("<div>")
        .addClass("col-md-1 hour")
        .text(dayjs().hour(hour).format("hA"));
      var textAreaCol = $("<textarea>")
        .addClass("col-md-10 description")
        .attr("data-hour", hour)
        .attr("idDescription", "event" + hour); 
      var saveBtnCol = $("<button>")
        .addClass("col-md-1 saveBtn")
        .html('<i class="fas fa-save"></i>');
  
      timeBlock.append(hourCol, textAreaCol, saveBtnCol);
      $(".container").append(timeBlock);
  
      // Load user input from global array
      textAreaCol.val(userInputs[hour - 9]);
    }
  }
```

* Now that all blocks are created I wanted to create a function to color code them, this is still a work in progress as the function seems not to be working yet. I decided to declare a variable currentHour that will store the current hour thanks to the dayjs and .hour functions and checks if:

```JavaScript
function updateHourStyles() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
        var hourBlock = parseInt($(this).attr("data-hour"));

        if (hourBlock < currentHour) {
            $(this).removeClass("present future").addClass("past");
        } else if (hourBlock === currentHour) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });
}
```

* I added an event listener for the save button, so that when it is clicked it calls the function saveEvent to store the user input in the specific hour field of the array, we will use this information also when we will reload the page. 

```JavaScript
$(".container").on("click", ".saveBtn", function () {
  var hour = $(this).siblings(".description").attr("data-hour");
  var event = $(this).siblings(".description").val();
  console.log("Received input:", event);
  saveEvent(hour, event);
  loadEvents(); // Load events after saving
});


function saveEvent(hour, event) {
  userInputs[hour - 9] = event; // Update the global array
  console.log("Data inserted into userInputs at index", hour - 9, ":", event);

  // Save userInputs array to local storage
  localStorage.setItem("userInputs", JSON.stringify(userInputs));

  var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || {};
  savedEvents["event" + hour] = event;
  localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}
```

* This is the function to load events from local storage by reading from the userInputs array in local storage. 

```JavaScript
function loadEvents() {
    var savedEvents = JSON.parse(localStorage.getItem("userInputs")) || {};
    $(".time-block").each(function () {
    var hourBlock = $(this).attr("data-hour");
    var savedEvent = savedEvents[hourBlock - 9] || "";

    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });
}
```

* The last thing I did was calling all the function I created to run the code. At the end I also included an interval function so that it should refresh the color code style every minute.

```JavaScript
displayCurrentDay();
createTimeBlocks();
updateHourStyles();
loadEvents(); 

// Periodically update the styles (every minute in this example)
setInterval(function() {
    updateHourStyles();
}, 60000);

```  

## Credits

I would like to thank all the teachers and TA of the EdX bootcamp for all the content provided and study materials.

## Project Status and Upcoming Improvements

The Webpage is functional and easy to navigate, the user can save and delete all notes, and once the page is reloaded all saved information are shown back in the correct time slot. Even if the main functionality of the page has been implemented, I still need to create an efficiend color coding function.

## Collaborations and Contributions

I welcome all the brilliant coders out there to join me in this project. Join effort can result in a fundamental learning experience for a beginner coder like me, so feel free to reach out with tips and advice. If you want to contribute to this project, pull requests are welcome, but if you want to make major changes, please open an issue first so that we can discuss what you would like to change. You can contact me on my GitHub profile [HERE](https://github.com/Nikola84ca) and visit this project repository by clicking [HERE](https://github.com/Nikola84ca/WorkDay-Scheduler).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## License

[MIT](https://choosealicense.com/licenses/mit/)
