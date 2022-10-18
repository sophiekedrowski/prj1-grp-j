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
let baseUrl = "https://developer.nps.gov/api/v1/parks?"
let limit = 500
let parkCode = ""
let apiKey = "wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL"

function searchApi(userInput) {
  var GeocodingApi = (`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherAPIkey}`);
  return fetch(GeocodingApi)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      var geolocation = {}
      geolocation.lat = res[0].lat;
      geolocation.lon = res[0].lon;
      return geolocation;
    });
}


var allParks = find_parks(baseUrl, parkCode, limit, apiKey)
document.getElementById("searchBtn").addEventListener("click", function () {
  var userCityInput = document.getElementById("UserInput").value
  
  var location = searchApi(userCityInput)
  location.then((loc) => {
    console.log(loc)
    allParks.then((allParkData) => {
    var info = combineparkandgeo(loc, allParkData);
    localStorage.setItem("info", JSON.stringify(info))
    window.location.href='search-results.html';
    console.log(searchRad);
    })
  })
})


function find_parks(baseUrl, parkCode, limit, apiKey) {
  return fetch(`${baseUrl}parkCode=${parkCode}&limit=${limit}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var allParkData = []
      for (let index = 0; index < data.data.length; index++) {
        const parkData = data.data[index];
        allParkData.push({ parkCode: parkData.parkCode, fullName: parkData.fullName, lat: parkData.latitude, lon: parkData.longitude });
      }
      console.log(allParkData)
      return allParkData;
    });
}

function combineparkandgeo(location, parksData) {
  var parksWithinRadius = []
  var searchRad = document.getElementById("rSearch").value
  for (let i = 0; i < parksData.length; i++) {
    var parkData = parksData[i];
    var actualDistance = distance(location.lat, location.lon, parkData.lat, parkData.lon);
    var roundedDistance = Math.round(actualDistance)
    // console.log(actualDistance)
    if (actualDistance <= searchRad) {
      console.log(actualDistance, parkData.fullName)
      parksWithinRadius.push({ miles: roundedDistance, parkName: parkData.fullName, parkCode: parkData.parkCode });
    }
    
  }
  return parksWithinRadius;
}

function parkLocalStorage(parkInfo) {
localStorage.setItem("parkInfo", parkInfo)
}




function distance(lat1, lon1, lat2, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
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
  return (c * r);
}



