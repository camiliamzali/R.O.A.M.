$(document).ready(function () {

  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  var paramObj = {
    city: urlParams.get("city"),
    state: urlParams.get("state"),
    date: urlParams.get("date")
  }

  var today = moment().format("MM-DD-YYYY");
  var maxDate = moment(today, "MM-DD-YYYY").add(108, "h").format("MM-DD-YYYY");

  $("#date-id").attr(`min ="${today}`);
  $("#date-id").attr(`max ="${maxDate}`);

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();

    // read from input tags

    var userInput = {
      city: $("#city-id").val().trim(),
      state: $("#state-id").val(),
      date: $("#date-id").val().trim()
    };

    var userInputUnix = parseInt(moment(userInput.date, "YYYY-MM-DD").format("X"));
    var maxDateUnix = parseInt(moment(maxDate, "MM-DD-YYYY").format("X"));

    if (!userInput.city || !userInput.state || !userInput.date) {
      return false;
    } 
    else if (userInputUnix > maxDateUnix) {
      console.log("greater")
      $("#date-rejection").text("* ROAM is all about being spontaneous. Try searching again within the next 4 days.");
      return false;
    }

    var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;

    location.href = eventUrl;

  });
});