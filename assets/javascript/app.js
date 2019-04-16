$(document).ready(function () {

  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  var paramObj = {
    city: urlParams.get("city"),
    state: urlParams.get("state"),
    date: urlParams.get("date")
  }

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