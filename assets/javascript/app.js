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



  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // read from input tags

    var userInput = {
      city: $("#city-id").val().trim(),
      state: $("#state-id").val(),
      date: $("#date-id").val()
    }

    fireData.ref().push(userInput, function () {
      var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;

      location.href = eventUrl;
    });
  });
});