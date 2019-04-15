
// weather API key-14e14c44973465093bbd1db899dbec19

// create variable to hold weather API -path/parameters()
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=14e14c44973465093bbd1db899dbec19"


$(document).ready(function () {


  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  console.log(urlParams)

  var paramObj = {
    city: urlParams.get("city"),
    state: urlParams.get("state"),
    date: urlParams.get("date")
  }

  console.log(paramObj);

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // read from input tags

    var userInput = {
      city: $("#city-id").val().trim(),
      state: $("#state-id").val(),
      date: $("#date-id").val().trim()
    };

    var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;

    location.href = eventUrl;
   
  });
});