$(document).ready(function () {

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

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // read from input tags
    var userInput = 
    {
    city: $("#place-id").val().trim(),
    state: $("#state-id").val(),
    date: $("#date-id").val().trim()
    }

    fireData.ref().push(userInput);

    var eventUrl = "events.html?place=" + userInput.place + "&date=" + userInput.date;   

    location.href = eventUrl;

  });


    // do not delete these brackets!!!
});