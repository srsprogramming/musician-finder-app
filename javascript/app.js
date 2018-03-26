console.log("ready!");

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
var finishData = [];
//<----Globals---->

var miles = "";
var distance = "";
var latlong1 = {};
var latlong2 = {};
var Latitude1 = "";
var Longitude1 = "";
var Latitude2 = "";
var Longitude2 = "";
var zip1 = 75204;
var zip2 = 75230;
var url1 = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip1;
var url2 = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip2;
// var maxFM_Results = 10;

//creates map
function initMap() {
  $.ajax({
    url: url1,
    method: "GET"
  }).then(function(response) {
    Latitude1 = response.results[0].geometry.location.lat;
    Longitude1 = response.results[0].geometry.location.lng;
    latlong1 = { lat: Latitude1, lng: Longitude1 };
  });
  $.ajax({
    url: url2,
    method: "GET"
  }).then(function(response) {
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
  miles = distance * 0.000621371192;
  miles = miles.toPrecision(2);
}
function musicianCreate() {
  if (miles < 25) {
    var addm = $("<p>");
    addm
      .html(finishData["0"].firstName + " " + miles + " away")
      .appendTo("#musicians");
  }
  // function(){

  // }
}




//document ready function
$(document).ready(function() {
  var forEachComplete = false;
  var childCount = 0;
  signUpData.ref().on("value", function(childSnapshot, prevChildKey) {
    var numChildren = childSnapshot.numChildren();
    childSnapshot.forEach(function(childSnapshot) {
      childCount++;
      var childData = childSnapshot.val();
      finishData.push(childData);
      if (childCount === numChildren) {
        initMap();
        lastFMajaxCall();
      }
      console.log("inside for each ", finishData);
    });

    function lastFMajaxCall() {
      var maxFM_Results = 3;
      //get artists name in Profile
      console.log("ajax call ", finishData[0]);
      var musicalTaste = finishData[0].musicalTaste;

      // last FM keys
      var APIkey = "939610d3ede414a19a0eef9dd79b91ec";
      var sharedSecret = "326d21aff9cb4cb41af3e3bf2ae1e2c3";
      var lastFMURL =
        "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&user=rj&artist=" +
        musicalTaste +
        "&api_key=" +
        APIkey +
        "&format=json";

      //Query is for top tracks
      $.ajax({
        url: lastFMURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        //firebase data pull

        //for loop to build html
        for (var count = 0; count < finishData.length; count++) {
          var newMusician = $("<div>");
          var newText = $("<ul>");
          newText.html(
            "<li>" +
              finishData[count].firstName +
              " " +
              finishData.lastName +
              "<li></li>" +
              "<li>Musical Taste: " +
              finishData[count].musicalTaste +
              "</li><li>Plays: " +
              finishData[count].instruments +
              "</li><li>Top Track " +
              count +
              1 +
              ". " +
              response.toptracks.track[count].name
          );
          $("#musician-data").append(newText);
          console.log(newText);
        }
      });
    }
    
  });
  $("#create-button").on("click", function(){
    console.log("buttonclicked");
    event.preventDefault();
    window.location.href = "profile.html";
  });
})
