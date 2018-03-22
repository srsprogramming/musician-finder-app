var maxFM_Results = 10;

// last FM query
// query on click
$("#me").on("click", function() {
  //get artists name from profile currently testing
  var artist = "metallica";

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
console.log(url1, url2)
//creates map
function initMap() {
            $.ajax({
                url: url1,
                method: "GET"
            })
                .then(function (response) {
                    Latitude1 = response.results[0].geometry.location.lat;
                    Longitude1 = response.results[0].geometry.location.lng;

                    console.log(Latitude1, Longitude1);

                    latlong1 = { lat: Latitude1, lng: Longitude1 };
                    console.log(latlong1)
                });
            $.ajax({
                url: url2,
                method: "GET"
            })
                .then(function (response) {
                    Latitude2 = response.results[0].geometry.location.lat;
                    Longitude2 = response.results[0].geometry.location.lng;

                    console.log(Latitude2, Longitude2);

                    latlong2 = { lat: Latitude2, lng: Longitude2 };
                    console.log(latlong2)

                    computeDistance(latlong1, latlong2);
                    getMiles();
                    musicianCreate();
                });
        
}

function computeDistance(ll1, ll2) {
    var loc1 = new google.maps.LatLng(ll1.lat, ll1.lng);
    var loc2 = new google.maps.LatLng(ll2.lat, ll2.lng);
    distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2);
    console.log(distance);
}
function getMiles() {
    miles=distance * 0.000621371192
    miles=miles.toPrecision(2);
    console.log(miles);
}
function musicianCreate(){
    if(miles<25){
        $('<div/>', {
            class: 'musician',
            href: 'http://google.com',
            title: 'Become a Googler',
            text: 'Drummer '+miles+' away',
            }).appendTo('#musicians');
    }
}



// Initialize Firebase (Gian's firebase)
// var config = {
//     apiKey: "AIzaSyDotrB-gPmp_vfr4WkVxDvPx416pRtF4YI",
//     authDomain: "fir-dfa77.firebaseapp.com",
//     databaseURL: "https://fir-dfa77.firebaseio.com",
//     projectId: "fir-dfa77",
//     storageBucket: "fir-dfa77.appspot.com",
//     messagingSenderId: "974979660205"
//   };
//   firebase.initializeApp(config);
//
// code for saving login data to firebase
