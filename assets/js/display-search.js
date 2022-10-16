var parksInfo = JSON.parse(localStorage.getItem("info"))
var npsKey = "wjZQ9PWzvuBiFbcfbbU3vKcpyOCQ7Hl9n8bTOQQL"
let baseUrl = "https://developer.nps.gov/api/v1/campgrounds?"
let limit = 700

var parkDiv = document.getElementById("parkInfo")
for (let i = 0; i < parksInfo.length; i++) {
    var parkInfo = parksInfo[i];
    var parkList = parkDiv.appendChild(document.createElement("li"))
    parkList.innerHTML = "National Park: " + parksInfo[i].parkName + " " + parksInfo[i].miles + " " + "miles from searched city"
}

var parkCodes = []
for (let i = 0; i < parksInfo.length; i++) {
    var parkCode = parksInfo[i].parkCode;
    parkCodes.push(parkCode)
}
if (0 == parkCodes.length) {
    document.getElementById("campsites").innerHTML = "No campsites matched your search criteria"
}

else {

    console.log(parkCodes)
    var parkCodeString = parkCodes.join(",")
    console.log(parkCodeString)


    fetch(`${baseUrl}parkCode=${parkCodeString}&limit=${limit}&api_key=${npsKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // console.log(data.data[0].name, data.data[0].campsites.totalSites)
            if (data.data.length == 0) {
                document.getElementById("campsites").innerHTML = "No campsites matched your search criteria"
            }
            else {

                var campsiteDiv = document.getElementById("campsites")
                for (let i = 0; i < data.data.length; i++) {
                    var campsiteInfo = data.data[i];
                    var campsitesDiv = campsiteDiv.appendChild(document.createElement("li"))
                    campsitesDiv.innerHTML = "Campsite Name: " + campsiteInfo.name + " " + " Total Sites: " + campsiteInfo.campsites.totalSites
                }
            }
        })
}
