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

// var npsApiKey = "wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL";
var weatherAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";

function searchApi(userInput) {
  var GeocodingApi = (`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherAPIkey}`);
  fetch(GeocodingApi)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      var lon1 = res[0].lon;
      var lat1 = res[0].lat;
      console.log("lat: " + lat1, "Lon: " + lon1);
      // var lat1 = lat
      // var lon1 = lon
      return lat1, lon1;
    });
}

document.getElementById("searchBtn").addEventListener("click", function () {
  var userCityInput = document.getElementById("UserInput").value
  var location = searchApi(userCityInput)
  console.log(location)
  var parkResults = find_parks(baseUrl, parkCode, limit, apiKey);
  console.log(parkResults)

})

let baseUrl = "https://developer.nps.gov/api/v1/parks?"
let limit = 500
let parkCode = ""
let apiKey = "wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL"


function find_parks(baseUrl, parkCode, limit, apiKey) {
  var allParkData = []
  fetch(`${baseUrl}parkCode=${parkCode}&limit=${limit}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      for (let index = 0; index < data.data.length; index++) {
        const parkData = data.data[index];
        // console.log(parkData.parkCode,parkData.latLong );
        allParkData.push({ parkCode: parkData.parkCode, fullName: parkData.fullName, lat: parkData.latitude, lon: parkData.longitude });
      }
      filterparks(allParkData)
      //passin
    });
  return allParkData;
}


function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
//Make math easier if I can
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));
  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;
  // document.write(distance(lat1, lat2,
  // lon1, lon2) + " K.M");

  // calculate the result
  return (c * r);

  //if less than 50, make a new array

}
//Write another function using the distance helper function.
function filterparks(parksArray){
  //pass in array of 
const userLat = 37.5858662;
const userLon = -85.67330523;
var filteredParks = [];
const defaultRadius = 50

  for (let i = 0; i < parksArray.length; i++) {
    var milesbetweenuserandpark = distance(userLat, parksArray[i].lat, userlon, parksArray[i].lon)
    if (condition) {
      
    }
  }


}

