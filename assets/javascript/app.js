// weather API key-14e14c44973465093bbd1db899dbec19

// eventbrite API key-U6LFLVBFHEWVLSLFOV

// variable for evenbrite API
var briteUrl = "https://"

// create variable to hold weather API -path/parameters()
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=14e14c44973465093bbd1db899dbec19"

// $.ajax({
//   url: weatherUrl,
//   method: "GET"
// }).then(function (response) {

// })

$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyCdBtqVdqAJ1OaV0tHQOwswrD39wviIFC0",
    authDomain: "roam-project-1.firebaseapp.com",
    databaseURL: "https://roam-project-1.firebaseio.com",
    projectId: "roam-project-1",
    storageBucket: "roam-project-1.appspot.com",
    messagingSenderId: "259803411135"
  };
  firebase.initializeApp(config);
  firebase.initializeApp(config);


  var fireData = firebase.database();

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
    }

    fireData.ref().push(userInput);

    var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;

    location.href = eventUrl;
  });
});