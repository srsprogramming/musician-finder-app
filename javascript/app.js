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

// function for saving login info


// ajax call to music API #1
$.ajax({
    url: MusicQueryURL,
    method: "GET"
  }).then(function(response) {
   
  });

// ajax call to map API (google or openMaps)
$.ajax({
    url: MapQueryURL,
    method: "GET"
  }).then(function(response) {
   
  });
