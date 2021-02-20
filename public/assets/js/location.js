let mymap, homeCircle;

//Shamelessly taken from W3 schools
function getLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function storePosition(position) {
    latField.value = position.coords.latitude;
    longField.value = position.coords.longitude;
}

function getISSInfo(e) {
    e.preventDefault();
    if(!mymap)mymap = L.map('map').setView([latField.value, longField.value], 1);
    else mymap.setView([latField.value, longField.value], 1);
    if(homeCircle) homeCircle.remove();
    homeCircle = L.circle([latField.value, longField.value], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);

    fetch('http://localhost:3000/currentISSPosition')
        .then(response => response.json())
        .then(data =>L.circle([data.latitude, data.longitude], {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(mymap));

    results.innerHTML = "Blue is the current position of the ISS and red is your inputted location <br/> Next ISS passes:\n";

    fetch('http://localhost:3000/passes?lat=' + latField.value + '&long=' + longField.value)
        .then(response => response.json())
        .then(data => data.forEach(date => {
            let stopDate = new Date(date);
            let node = document.createElement("LI");
            let textNode = document.createTextNode(stopDate.toLocaleString());
            node.appendChild(textNode);
            results.appendChild(node);
        }))
        .catch(error=>{
            alert("Please enter a valid latitude and longitude");
        });
}

results = document.getElementById("results");
latField = document.getElementById("lat");
longField = document.getElementById("long");
form = document.getElementById("locationForm");
document.getElementById("locationButton").addEventListener("click", getLocation);
form.addEventListener("submit", getISSInfo);
