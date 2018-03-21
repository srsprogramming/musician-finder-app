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

var Latitude = "";
var Longitude = "";
var zip = "75248";
var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip;
console.log(url)
//creates map
function initMap() {
    $.ajax({
        url: url,
        method: "GET"
    })
        .then(function (response) {
            Latitude = response.results[0].geometry.location.lat;
            Longitude = response.results[0].geometry.location.lng;
            console.log(Latitude, Longitude);
            var latlong = { lat: Latitude, lng: Longitude };
            console.log(latlong)
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 9,
                center: latlong
            });
            //creates marker
            var marker = new google.maps.Marker({
                position: latlong,
                map: map
            });
            //creates circle
            var circle = new google.maps.Circle({
                map: map,
                radius: 40233.6,    // 10 miles in metres
                fillColor: '#AA0000'
            });
            circle.bindTo('center', marker, 'position');
        }
        );
    };
    $("#loginbutton").click(function(e){
        e.preventDefault();
        var username = $("username").val().trim();
        var password = $("password").val().trim();
        checkLogin(username, password);
        window.location = "profile.html";    
});

function checkLogin (username, password){
database.ref("/passwords")
}


// Initialize Firebase (Gian's firebase)
var config = {
    apiKey: "AIzaSyDotrB-gPmp_vfr4WkVxDvPx416pRtF4YI",
    authDomain: "fir-dfa77.firebaseapp.com",
    databaseURL: "https://fir-dfa77.firebaseio.com",
    projectId: "fir-dfa77",
    storageBucket: "fir-dfa77.appspot.com",
    messagingSenderId: "974979660205"
  };
  firebase.initializeApp(config);

// code for saving login data to firebase
var database = firebase.database();
var logindata = database.child("login");
var test = "test";
logindata.push(test);
