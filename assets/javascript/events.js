$(document).ready(function () {
  // Initialize Firebase
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

  var paramObj = {
    place: urlParams.get("place"),
    date: urlParams.get("date")
  }
  console.log(paramObj);


  fireData.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    console.log("this is child_added");

    var eventsData = childSnapshot.val();
    searchCity = eventsData.city;
    searchState = eventsData.state
    searchDate = eventsData.date

    // create a variable for each API url that will be used

    // var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${.....}&APPID=14e14c44973465093bbd1db899dbec19`
    var ticketMasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&city=${searchCity}&stateCode=${searchState}&startDateTime=${searchDate}`

    // make an ajax call for each separate API key

    $.ajax({
        url: ticketMasterUrl,
        method: "GET"
      })
      .then(function (ticketMasterResponse) {
        console.log(ticketMasterResponse);

      });

  });

});