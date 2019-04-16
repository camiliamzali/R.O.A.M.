$(document).ready(function () {

  // read query parameters from the url
  var urlParams = new URLSearchParams(window.location.search);



  var paramObj = {
    city: urlParams.get("city"),
    date: urlParams.get("date"),
    state: urlParams.get("state")
  };
  console.log(paramObj)



  // Ticketmaster requires a specific date format for their API call
  ticketMasterDate = moment(paramObj.date, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ssZ");
  var ticketMasterEndDate = moment(paramObj.date, "YYYY-MM-DD").add(23, "h").format("YYYY-MM-DDTHH:mm:ssZ")
  var ticketMasterUrl = `https://alex-rosencors.herokuapp.com/?url=https://app.ticketmaster.com/discovery/v2/events.json?size=12&apikey=8pz0roVaKoVrDwdaTb4ChFO20fDnHIrg&city=${paramObj.city}&stateCode=${paramObj.state}&startDateTime=${ticketMasterDate}&endDateTime=${ticketMasterEndDate}`
  console.log(ticketMasterUrl)
  // 34298613862c897b961ca0ebebbda16d
  // var openWeatherUrl = `api.openweathermap.org/data/2.5/forecast?zip=${tmZipcode},us`

  $.ajax({
      url: ticketMasterUrl,
      method: "GET"
    })
    .then(function (ticketMasterResponse) {

      var tmResults = ticketMasterResponse._embedded.events;

      if (ticketMasterResponse._embedded[0]) {
        $("#event-wrapper").text("No Search Results Found");
        return false;
      }

      // This section is on Events Page load after initial search from main page //

      tmResults.forEach(function (event) {

        var tmZipCode = event._embedded.venues[0].postalCode;

        var eventDiv = $(`<div class="card-wrapper d-flex flex-column mb-5 pb-2 pt-3 px-3 col-12 col-md-4 mb-2">`);
        eventDiv.attr("data-zip", tmZipCode);
        var ticketButton = $(`<a href=${event.url} target="_blank" class="btn btn-block btn-danger">`).text("Get Tickets");


        var eventImg = $(`<img class="card-img-top" src=${event.images[1].url} />`);
        var eventDivBody = $(`<div class="card-body">`);

        var eventH5 = $(`<h5 class="card-title title-font">`);
        eventH5.text(event.name);
        var eventP = $(`<p class="text-muted normal-font card-text">`);

        var venueName = event._embedded.venues[0].name
        var eventDate = event.dates.start.localDate
        var eventDateFormatted = moment(eventDate, "YYYY-MM-DDTHH:mm:ssZ").format("M-DD-YYYY");
        var eventTime = event.dates.start.localTime
        var eventTimeFormatted = moment(eventTime, "HH:mm:ss").format("h:mm a");
        eventP.append(`${venueName}<br>${eventDateFormatted}<br>${eventTimeFormatted}`);
        eventDivBody.append(eventH5, eventP);
        eventDiv.append(eventImg, eventDivBody, ticketButton);

        $("#destination").text(paramObj.city);
        // $("#date").text(eventDateFormatted);
        $("#event-wrapper").append(eventDiv);

      });

      // End initial search section //
      $("#event-wrapper").on("click", ".card-wrapper", function () {
        var tmZipCode = $(this).attr("data-zip");
        var openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${tmZipCode}&APPID=34298613862c897b961ca0ebebbda16d`

        $.ajax({
            url: openWeatherUrl,
            method: "GET"
          })
          .then(function (openWeatherResponse) {
            console.log(openWeatherResponse);

            var owResults = openWeatherResponse.list[0];
            var owTempMax = owResults.main.temp_max;
            var owTempMin = owResults.main.temp_min;
            var tempMaxConverted = parseInt(1.8 * (owTempMax - 273) + 32);
            var tempMinConverted = parseInt(1.8 * (owTempMin - 273) + 32);
            var weatherCond = owResults.weather[0].description;
            var weatherIcon = owResults.weather[0].icon;

            var iconPTag = $(`<p class="normal-font text-muted">`).append(weatherIcon);
            var conditionPTag = $(`<p class="normal-font text-muted">`).append(weatherCond);
            var lowTemperaturePTag = $(`<p class="normal-font text-muted">`).append(`Low: ${tempMinConverted}°`);
            var highTemperaturePTag = $(`<p class="normal-font text-muted">`).append(`High: ${tempMaxConverted}°`)


            var weatherDivBody = $(`<div class="card-body">`);
            weatherDivBody.append(iconPTag, conditionPTag, lowTemperaturePTag, highTemperaturePTag);

            $("#weather-wrapper").html(weatherDivBody);
          })
      })


      // Begin section for the events page specific search bar //

      $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        // read from user input tags

        var userInput = {
          city: $("#city-id").val().trim(),
          state: $("#state-id").val(),
          date: $("#date-id").val().trim()
        };

        var eventUrl = "events.html?city=" + userInput.city + "&state=" + userInput.state + "&date=" + userInput.date;
        location.href = eventUrl;

        $.ajax({
            url: ticketMasterUrl,
            method: "GET"
          })
          .then(function (ticketMasterResponse) {

            if (ticketMasterResponse._embedded[0]) {
              $("#event-wrapper").text("No Search Results Found");
              return false;
            }

            var tmResults = ticketMasterResponse._embedded.events

            tmResults.forEach(function (event) {

              var tmZipCode = event._embedded.venues[0].postalCode;

              var eventDiv = $(`<div class="card-wrapper d-flex flex-column mb-5 pb-2 pt-3 px-3 col-12 col-md-4 mb-2">`);
              eventDiv.attr(`${tmZipCode}`);

              var ticketButton = $(`<a class="btn btn-block btn-danger">`).text("Get Tickets");

              var eventImg = $(`<img class="card-img-top" src=${event.images[1].url}/>`);
              var eventDivBody = $(`<div class="card-body">`);

              var eventH5 = $(`<h5 class="card-title title-font">`);
              eventH5.text(event.name);
              var eventP = $(`<p class="card-text text-muted normal-font">`);
              var ticketButton = $(`<a class="btn btn-block btn-danger align-self-end">`).text("Get Tickets!");
              var venueName = event._embedded.venues[0].name
              var eventDate = event.dates.start.localDate
              var eventDateFormatted = moment(eventDate, "YYYY-MM-DDTHH:mm:ssZ").format("M-DD-YYYY");
              var eventTime = event.dates.start.localTime
              var eventTimeFormatted = moment(eventTime, "HH:mm:ss").format("h:mm a");
              eventP.append(`${venueName}<br>${eventDateFormatted}<br>${eventTimeFormatted}`);
              eventDivBody.append(eventH5, eventP);
              eventDiv.append(eventImg, eventDivBody, ticketButton);

              $("#destination").text(paramObj.city);
              $("#date").text(eventDateFormatted);
              $("#event-wrapper").append(eventDiv);

              location.href = eventUrl;

            });
          });
      });
    });
  //slideshow jumbotron
  var backgroundImg = ["assets/images/events-hero1.jpg", "assets/images/events-hero7.jpg", "assets/images/events-hero8.jpg"];
  var showImage;
  var count = 0;

  //slideshow function
  //   function displayBackground() {
  //     $(".event-hero-image").css({
  //       "background": "url(" + backgroundImg[count] + ")",
  //       "background-position": "center",
  //       "background-size": "cover",
  //       "background-repeat": "no-repeat",
  //       "border-bottom": "black 3px",
  //     });

  //   }

  //   function nextImage() {
  //     $(".event-hero-image").fadeIn("slow", function () {
  //       count++;
  //       setTimeout(displayBackground, 4000);
  //       if (count === backgroundImg.length) {
  //         count = 0;
  //       }
  //     });

  //   }

  //   function startSlideShow() {
  //     showImage = setInterval(nextImage, 4000);
  //   }

  //   startSlideShow();
  $('.event-hero-image').slick({
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
});