var rp = require('request-promise');

var address = '130+Rue+de+la+Barre,+Longueuil,+CA';

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
      //console.log(coordinates);
      return coordinates;
    }
  ) 
}

//getIssPosition().then(function(data){console.log(data)});


function getAddressPosition(address) {
  var api_key = 'AIzaSyCacpxCphTH7131rccYn9_3f9quqebrHhM'
  return rp('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+api_key)
  .then(
    function(data) {
      var results = JSON.parse(data);
      
      var coordinates = {
        "lat": results.results[0].geometry.location.lat,
        "lng": results.results[0].geometry.location.lng
      };
      //console.log(coordinates);
      return coordinates;
    })
}

//getAddressPosition();

function getCurrentTemperatureAtPosition(coordinates) {
  return rp('https://api.darksky.net/forecast/37f5d4285ae1e5fa0603200af1584b40/'+coordinates.lat+','+coordinates.lng)
  .then(
    function(data) {
        var result = JSON.parse(data);
        
        var temperature = result.currently.temperature;
        //console.log(temperature);
        return temperature;
    })
}
//var coordinates = { lat: 37.4224082, lng: -122.0856086 };
//getCurrentTemperatureAtPosition(coordinates);


function getCurrentTemperature(address) {
  getAddressPosition(address)
   .then(
     function(coordinates){
       return getCurrentTemperatureAtPosition(coordinates)
     })
}

//getCurrentTemperature();

function getDistanceFromIss(address) {
  Promise.all([getAddressPosition(address), getIssPosition()])
  .then(function(data){
    //console.log(data);
    console.log("The distance between me and orbital satellite is "+ getDistance(data[0], data[1]) + " kilometers.");
    return getDistance(data[0], data[1]);
  })
}

getDistanceFromIss(address);