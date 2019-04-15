$(document).ready(function () {

  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);

  var paramObj = {
    city: urlParams.get("city"),
    date: urlParams.get("date"),
    state: urlParams.get("state")
  };

  ticketMasterDate = moment(paramObj.date, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ssZ")

  // create a variable for each API url that will be used
  var ticketMasterUrl = `https://alex-rosencors.herokuapp.com/?url=https://app.ticketmaster.com/discovery/v2/events.json?size=9&apikey=8pz0roVaKoVrDwdaTb4ChFO20fDnHIrg&city=${paramObj.city}&stateCode=${paramObj.state}&startDateTime=${ticketMasterDate}`


  // make an ajax call for each separate API key

  $.ajax({
      url: ticketMasterUrl,
      method: "GET"
    })
    .then(function (ticketMasterResponse) {
      console.log(ticketMasterResponse);

      var tmResults = ticketMasterResponse._embedded.events

      if (!ticketMasterResponse._embedded) {
        $("#event-wrapper").text("No Search Results Found");
        return false;
      }

      tmResults.forEach(function (event) {
        console.log(event.url);
        var eventDiv = $(`<div class="card-wrapper col-12 col-md-4">`);
        var ticketButton = $(`<a href=${event.url} target="_blank" class="btn btn-block btn-danger">`).text("Get Tickets");


        var eventImg = $(`<img class="card-img-top" src=${event.images[0].url} />`);
        var eventDivBody = $(`<div class="card-body">`);

        var eventH5 = $(`<h5 class="card-title">`);
        eventH5.text(event.name);
        var eventP = $(`<p class="card-text">`);

        var venueName = event._embedded.venues[0].name
        var eventDate = event.dates.start.localDate
        var eventDateFormatted = moment(eventDate, "YYYY-MM-DDTHH:mm:ssZ").format("M-DD-YYYY");
        var eventTime = event.dates.start.localTime
        var eventTimeFormatted = moment(eventTime, "HH:mm:ss").format("h:mm a");
        eventP.append(`${venueName}<br>${eventDateFormatted}<br>${eventTimeFormatted}`);
        eventDivBody.append(eventH5, eventP, ticketButton);
        eventDiv.append(eventImg, eventDivBody);

        $("#destination").text(paramObj.city);
        // $("#date").text(eventDateFormatted);
        $("#event-wrapper").append(eventDiv);

      });

      $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        // read from input tags

        var userInput = {
          city: $("#city-id").val().trim(),
          state: $("#state-id").val(),
          date: $("#date-id").val().trim()
        };

        var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;

        $.ajax({
            url: ticketMasterUrl,
            method: "GET"
          })
          .then(function (ticketMasterResponse) {

            var tmResults = ticketMasterResponse._embedded.events

            tmResults.forEach(function (event) {

            
              var ticketButton = $(`<button class="btn btn-block btn-danger">`).text("Get Tickets")
              var eventDiv = $(`<div class="card-wrapper mb-5 pt-3 px-3 col-12 col-md-4">`);

              var eventImg = $(`<img class="card-img-top" src=${event.images[0].url}/>`);
              var eventDivBody = $(`<div class="card-body">`);

              var eventH5 = $(`<h5 class="card-title">`);
              eventH5.text(event.name);
              var eventP = $(`<p class="card-text">`);
              var ticketButton = $(`<button class="btn btn-block btn-danger">`).text("Get Tickets!");
              var venueName = event._embedded.venues[0].name
              var eventDate = event.dates.start.localDate
              var eventDateFormatted = moment(eventDate, "YYYY-MM-DDTHH:mm:ssZ").format("M-DD-YYYY");
              var eventTime = event.dates.start.localTime
              var eventTimeFormatted = moment(eventTime, "HH:mm:ss").format("h:mm a");
              eventP.append(`${venueName}<br>${eventDateFormatted}<br>${eventTimeFormatted}`);
              eventDivBody.append(eventH5, eventP, ticketButton);
              eventDiv.append(eventImg, eventDivBody);

              $("#destination").text(paramObj.city);
              $("#date").text(eventDateFormatted);
              $("#event-wrapper").append(eventDiv);

              location.href = eventUrl;

            });
          });
      });
    });
  //slideshow jumbotron
  var backgroundImg = ["assets/images/events-hero2.jpg", "assets/images/events-hero3.jpg", "assets/images/events-hero4.jpg, assets/images/events-hero4.jpg"];
  var showImage;
  var count = 0;

  //slideshow function
  function displayBackground() {
    $(".event-hero-image").css({
      "background": "url(" + backgroundImg[count] + ")",
      "background-position": "center",
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "border-bottom": "black 3px",
      "animation-duration": "2s"
    });

  }

  function nextImage() {
    $(".event-hero-image").fadeIn("slow", function () {
      count++;
      setTimeout(displayBackground, 4000);
      if (count === backgroundImg.length) {
        count = 0;
      }
    });

  }

  function startSlideShow() {
    showImage = setInterval(nextImage, 4000);
  }

  startSlideShow();
});