var maxFM_Results = 10;

// last FM query
// query on click
$("#me").on("click", function() {
  //get artists name
  var artist = "snoop+dogg";

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
      console.log(count, " Track: ",response.toptracks.track[count].name);
    }
  });
});

// ajax call to map API (google or openMaps)
// var mapQueryURL;
// $.ajax({
//     url: mapQueryURL,
//     method: "GET"
//   }).then(function(response) {

//   });

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
