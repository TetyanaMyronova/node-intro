var rp = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  return rp('http://api.open-notify.org/iss-now.json ')
  .then(
    function(response) {
      // Parse as JSON
      var result = JSON.parse(response);

      var coordinates = {
        "lat": result.iss_position.latitude,
        "lng": result.iss_position.longitude
      };
      // Return object with lat and lng
      return coordinates;
    }
  ) 
}

getIssPosition().then(function(data){console.log(data)});


function getAddressPosition(address) {
  return rp('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCacpxCphTH7131rccYn9_3f9quqebrHhM')
  .then(
    function(data) {
      var results = JSON.parse(data);
      
      var coordinates = {
        "lat": results.results[0].geometry.location.lat,
        "lng": results.results[0].geometry.location.lng
      };
      return coordinates;
    })
}

//getAddressPosition();

function getCurrentTemperatureAtPosition(position) {

}

function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}