




document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  updateWeather();
  
});
  
document.getElementById("weatherSubmit").addEventListener("DOMContentLoaded", function() {
  console.log("Can anybody hear me?");
  updateWeather();
});

/*
Determine if the Value box was populated by the user or not. Call ip-api if it's empty
*/
function updateWeather(){  
  //not sure what it is that I need to get moment live
  //var moment = require('moment');
  //moment().format();
  //<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  event.preventDefault();
  var value = document.getElementById("weatherInput").value;
  let dataDump = "";
  if (value === ""){
    const locatorUrl = "http://ip-api.com/json/";
    fetch(locatorUrl).then(function(response){
      return response.json();
    }).then(function(json) {
      value = json.city;
      dataDump += '<p>Locator found the location as ' + value + "</p>";
      dataDump += '<p>IP: ' + json.query + "</p>";
      dataDump += '<p>Region: ' + json.region + "</p>";
      dataDump += '<p>Status: ' + json.status + "</p>";
      console.log("locator found the location as " + value);
      console.log("IP: " + json.query);
      console.log("region " + json.region);
      console.log("status: " + json.status);
      actuallyUpdateTheWeather(value);
      document.getElementById("ipData").innerHTML = dataDump;

    });
    
    //value = "Provo";
    //return;
  } else {
    actuallyUpdateTheWeather(value);
  }
}
  
/*
call the weather api with the provided city name
*/
function actuallyUpdateTheWeather(value){  
  console.log("erm... " + value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=23becb767a9eae4ffb96abf5d0e76e80";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>";
      results += "<p>";
      for (let i=0; i < json.weather.length; i++) {
	      results += json.weather[i].description;
	      if (i !== json.weather.length - 1)
	        results += ", ";
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
    
    //-----Forecast Phase
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=23becb767a9eae4ffb96abf5d0e76e80";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "Five Day Forecast:<br>";
      
      var i = 0;
      while (i < json.list.length) {
	      forecast += moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "  ";
	      forecast += json.list[i].main.temp + " &deg;F  ";
	      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/><br>';
        
        i++;
        if (i % 3 == 0){
          forecast += '<br>';
        }
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
    
    
    
}
