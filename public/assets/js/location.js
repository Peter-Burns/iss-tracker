//Shamelessly taken from W3 schools
function getLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function storePosition(position){
    latField.value = position.coords.latitude;
    longField.value = position.coords.longitude;
    console.log(position);
}

function getISSInfo(e){
    e.preventDefault();
    results.innerHTML = "Next ISS passes:\n";
    fetch('http://localhost:3000/passes?lat=' + latField.value + '&long=' + longField.value)
    .then(response =>response.json())
    .then(data =>data.forEach(date=>{
        let stopDate = new Date(date);
        let node = document.createElement("LI");
        let textNode = document.createTextNode(stopDate.toLocaleString());
        node.appendChild(textNode);
        results.appendChild(node);
    }));
}

results = document.getElementById("results");
latField = document.getElementById("lat");
longField = document.getElementById("long"); 
form = document.getElementById("locationForm");
document.getElementById("locationButton").addEventListener("click", getLocation);
form.addEventListener("submit", getISSInfo);
