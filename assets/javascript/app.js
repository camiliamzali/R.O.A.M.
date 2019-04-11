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