Initialize Firebase
var config = {
  apiKey: "AIzaSyCdBtqVdqAJ1OaV0tHQOwswrD39wviIFC0",
  authDomain: "roam-project-1.firebaseapp.com",
  databaseURL: "https://roam-project-1.firebaseio.com",
  projectId: "roam-project-1",
  storageBucket: "",
  messagingSenderId: "259803411135"
};
firebase.initializeApp(config);

var fireData = firebase.database();

var $userInput = 

// 8pz0roVaKoVrDwdaTb4ChFO20fDnHIrg
var ticketmasterURL = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&city=
var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.$placeInput}APPID=14e14c44973465093bbd1db899dbec19`

$.ajax({
  url: weatherUrl,
  method: "GET"
}).then(function (response) {
});

$.ajax({
  url: ticketmasterURL,
  method: "GET"
}).then(function (response) {
});


$(document).ready(function () {
  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  var paramObj = {
    place: urlParams.get("place"),
    date: urlParams.get("date")
  }

  console.log(paramObj);

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // read from input tags
    var place = $("#place-id").val().trim();
    var date = $("#date-id").val().trim();

    var eventUrl = "events.html?place=" + place + "&date=" + date;

    location.href = eventUrl;

  })
});