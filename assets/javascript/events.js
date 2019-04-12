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
    city: urlParams.get("city"),
    date: urlParams.get("date"),
    state: urlParams.get("state")
  };
  console.log(paramObj);

  ticketMasterDate = moment(paramObj.date, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ssZ")

  // create a variable for each API url that will be used
  var ticketMasterUrl = `https://alex-rosencors.herokuapp.com/?url=https://app.ticketmaster.com/discovery/v2/events.json?size=9&apikey=8pz0roVaKoVrDwdaTb4ChFO20fDnHIrg&city=${paramObj.city}&stateCode=${paramObj.state}&startDateTime=${ticketMasterDate}`


  // make an ajax call for each separate API key

  $.ajax({
      url: ticketMasterUrl,
      method: "GET"
    })
    .then(function (ticketMasterResponse) {

      var tmResults = ticketMasterResponse._embedded.events
      console.log(tmResults);
      console.log(tmResults.length);

      tmResults.forEach(function(event) {
        console.log(event);
        console.log(event.images[0].url);
        console.log(event.name);
        console.log(event._embedded.venues[0].name);
        console.log(event.dates.start.localTime);
        console.log(event.dates.start.localDate);
        var eventDiv = $(`<div class="event-wrapper m-2 col-12 col-md">`);

        
        var eventImg = $(`<img class="card-img-top" src=${event.images[0].url} />`);
        var eventDivBody = $(`<div class="card-body">`);
        
        var eventH5 = $(`<h5 class="card-title">`);
        eventH5.text(event.name);
        var eventP = $(`<p class="card-text">`);
        
        var venueName = event._embedded.venues[0].name
        var eventDate = event.dates.start.localDate
        var eventTime = event.dates.start.localTime
        eventP.append(venueName, eventDate, eventTime);
        eventDivBody.append(eventH5, eventP);
        eventDiv.append(eventImg, eventDivBody);


        console.log(eventDiv);
        $("#event-cards").append(eventDiv);
      })

    });

});