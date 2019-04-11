
// $(document).ready(function () {

//   // Initialize Firebase
//   // var config = {
//   //   apiKey: "AIzaSyCdBtqVdqAJ1OaV0tHQOwswrD39wviIFC0",
//   //   authDomain: "roam-project-1.firebaseapp.com",
//   //   databaseURL: "https://roam-project-1.firebaseio.com",
//   //   projectId: "roam-project-1",
//   //   storageBucket: "",
//   //   messagingSenderId: "259803411135"
//   // };
//   // firebase.initializeApp(config);

//   // var fireData = firebase.database();

//   // take user input, and put it into an object

//   // var userInput = {
//   //   citySearch: $("#event-input").val().trim(),
//   //   dateSearch: $("date-input").val().trim(),
//   // }

//   // adds user input values to firebase
//   // fireData.ref().push(userInput);

//   // create a variable for each API url that will be used

//   // var leaflyUrl = 


//   // var eventbriteUrl = 

//   // set-up an AJAX call to retrieve data dumps for each API

//   // create shorthand variables to refer to the information received
//   // ex.
//   //   var leaflyResults = leaflyResponse.data
//   //   var briteResults = eventbriteResponse.data








//   // do not delete these brackets!!!
// });
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
