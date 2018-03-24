$( document ).ready(function() {
    console.log( "ready!" );
//<----Globals---->

var firstname = "";
var lastname = "";
var musicalTaste = "";
var instruments = "";
var zipCode = "";
var zipCode2 = "";
var miles="";
var distance = "";
var latlong1 = {};
var latlong2 = {};
var Latitude1 = "";
var Longitude1 = "";
var Latitude2 = "";
var Longitude2 = "";
var zip1 = "75158";
var zip2 = "75159";
var url1 = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip1;
var url2 = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip2;
var maxFM_Results = 10;





// last FM query
// query on click
$("#me").on("click", function() {
  //get artists name from profile currently testing
  var artist = musicalTaste;

  // last FM keys
  var APIkey = "939610d3ede414a19a0eef9dd79b91ec";
  var sharedSecret = "326d21aff9cb4cb41af3e3bf2ae1e2c3";
  var lastFMURL =
    "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&user=rj&artist=" +
    artist +
    "&api_key=" +
    APIkey +
    "&format=json";

  $.ajax({
    url: lastFMURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //loops and prints out top 10 tracks and the albums
    for(var count = 0; count < maxFM_Results; count++){

      // console.log(count, " Track: ",response.toptracks.track[count].name);
      var newTrack = $("<p>");
      newTrack.html((count+1) + ". "+ response.toptracks.track[count].name);
      $("#top-tracks").append(newTrack);
    }
  });
});

//creates map
function initMap() {
            $.ajax({
                url: url1,
                method: "GET"
            })
                .then(function (response) {
                    Latitude1 = response.results[0].geometry.location.lat;
                    Longitude1 = response.results[0].geometry.location.lng;
                    latlong1 = { lat: Latitude1, lng: Longitude1 };
                });
            $.ajax({
                url: url2,
                method: "GET"
            })
                .then(function (response) {
                    Latitude2 = response.results[0].geometry.location.lat;
                    Longitude2 = response.results[0].geometry.location.lng;
                    latlong2 = { lat: Latitude2, lng: Longitude2 };
                    computeDistance(latlong1, latlong2);
                    getMiles();
                    musicianCreate();
                });
        
}

function computeDistance(ll1, ll2) {
    var loc1 = new google.maps.LatLng(ll1.lat, ll1.lng);
    var loc2 = new google.maps.LatLng(ll2.lat, ll2.lng);
    distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2);
}
function getMiles() {
    miles=distance * 0.000621371192
    miles=miles.toPrecision(2);
}
function musicianCreate(){
    if(miles<25){
        var addm= $("<p>");
        addm.html(instruments+' '+miles+' away').appendTo('#musicians');
    }
}

//<-----------------firebase-------------------->
var config = {
    apiKey: "AIzaSyAIxmjvOnZhdckoJ4pAiOCarAWCM0tNn84",
    authDomain: "musician-finder-app.firebaseapp.com",
    databaseURL: "https://musician-finder-app.firebaseio.com",
    projectId: "musician-finder-app",
    storageBucket: "musician-finder-app.appspot.com",
    messagingSenderId: "419167107386"
};
firebase.initializeApp(config);

var signUpData = firebase.database();

signUpData.ref().on("value", function(childSnapshot, prevChildKey){
console.log(childSnapshot)
    firstName = childSnapshot.val().firstName;
    lastName = childSnapshot.val().lastName;
    musicalTaste= childSnapshot.val().musicalTaste;
    instruments = childSnapshot.val().instruments;
    zipCode = childSnapshot.val().zipCode;
    zipCode2 = childSnapshot.val().zipCode2;
    
});
});