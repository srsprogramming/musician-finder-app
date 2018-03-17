var spotifyClientID = "a508f7d3f19645cf876ae81a9fc14e96";

//API Key below 
var spotClientSecretID = "efe6bc1c1b2b4ddaa75a51ceefcd1601";

var spotifyURL ="https://accounts.spotify.com/authorized/?"

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


// temp code
GET https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09

var query = "hello";
// ajax call to Spotify API1
var aRequest = function(){
    $.ajax({
        url: spotifyURL,
        data: {
            client_id: spotifyClientID,
            response_type: "code",
            redirect_uri: idk, //idk!!!!!!
            q: query,
            type: 'album'
        },
        success: function (response) {
            console.log(response);
        }
    });

}

$(document).ready(function(){
   console.log( $('#me').click(aRequest));
})

// ajax call to map API (google or openMaps)
// $.ajax({
//     url: MapQueryURL,
//     method: "GET"
//   }).then(function(response) {
   
//   });
