// weather API key-14e14c44973465093bbd1db899dbec19

// eventbrite API key-U6LFLVBFHEWVLSLFOV

// variable for evenbrite API
var briteUrl="https://"

// create variable to hold weather API -path/parameters()
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "APPID=14e14c44973465093bbd1db899dbec19"

$.ajax({
  url: weatherUrl,
  method: "GET"
}).then(function (response) {
 


})