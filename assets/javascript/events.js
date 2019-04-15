$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANafHvgYnRELAFSWMgZCFsPAfB2L_TNtM",
    authDomain: "roam-project-x.firebaseapp.com",
    databaseURL: "https://roam-project-x.firebaseio.com",
    projectId: "roam-project-x",
    storageBucket: "roam-project-x.appspot.com",
    messagingSenderId: "290287520982"
  };
  firebase.initializeApp(config);

  var fireData = firebase.database();

  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  var paramObj = {
    cit: urlParams.get("city"),
    place: urlParams.get("state"),
    date: urlParams.get("date")
  }
  console.log(paramObj);

  // create a variable for each API url that will be used

  // var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${.....}&APPID=14e14c44973465093bbd1db899dbec19`

  var ticketMasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&city=${paramObj.City}&stateCode=${paramObj.State}&startDateTime=${paramObj.Date}`

  // make an ajax call for each separate API key

  $.ajax({
      url: ticketMasterUrl,
      method: "GET"
    })
    .then(function (ticketMasterResponse) {
      console.log(ticketMasterResponse);

    });

});