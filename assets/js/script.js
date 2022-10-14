//project requirements
// Use a CSS framework other than Bootstrap.
// Be deployed to GitHub Pages.
// Be interactive (in other words, accept and respond to user input).
// Use at least two server-side APIsLinks to an external site..
// Use modals instead of alerts, confirms, or prompts.
// Use client-side storage to store persistent data.
// Be responsive.
// Have a polished UI.
// Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class/id naming conventions, indentation, quality comments, and so on).
// Have a quality README (including a unique name, description, technologies used, screenshot, and link to the deployed application).


// fetch('https://maps.googleapis.com/maps/api/staticmap?center')
// .then((response) => response.json())
// .then((data) => console.log(data));


// fetch('https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL'
// )
// .then((response) => response.json())
// .then((data) => console.log(data));

// var mapsApi = "https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJd8BlQ2BZwokRAFUEcm_qrcA&key=AIzaSyA9cuMJRTIoAsHEj2yUFVN-eB9Tu8-0wuU"

// document.getElementById("searchBtn").addEventListener("click", function(){
//   var userCityInput = document.getElementById("UserInput").value
//   fetch(mapsApi)
//   var formattedApi = (`https://maps.googleapis.com/maps/api/geocode/json?place_id=${userCityInput}`&key=AIzaSyA9cuMJRTIoAsHEj2yUFVN-eB9Tu8-0wuU'):

 var NPSApiKey = "wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL"
 var npsApi = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL"
 var mapsApiKey = "AIzaSyA9cuMJRTIoAsHEj2yUFVN-eB9Tu8-0wuU"
 var weatherAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";


function searchApi(userInput) {
  var GeocodingApi = (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherAPIkey}`);
  fetch(GeocodingApi)
      .then((res) => res.json())
      .then((res) => {
          console.log(res);
          var lon = res.city.coord.lon;
          var lat = res.city.coord.lat;
          var cityID = res.city.id;
          console.log("lat: " + lat, "Lon: " + lon);
});
return lat, lon;
}

document.getElementById("searchBtn").addEventListener("click", function(){
var userCityInput = document.getElementById("UserInput").value
var location = searchApi(userCityInput)
console.log(location)
})
