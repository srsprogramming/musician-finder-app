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

// var Latitude = "";
// var Longitude = "";
// var zip = "75248";
// var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip;
// console.log(url)
// //creates map
// function initMap() {
//     $.ajax({
//         url: url,
//         method: "GET"
//     })
//         .then(function (response) {
//             Latitude = response.results[0].geometry.location.lat;
//             Longitude = response.results[0].geometry.location.lng;
//             console.log(Latitude, Longitude);
//             var latlong = { lat: Latitude, lng: Longitude };
//             console.log(latlong)
//             var map = new google.maps.Map(document.getElementById('map'), {
//                 zoom: 9,
//                 center: latlong
//             });
//             //creates marker
//             var marker = new google.maps.Marker({
//                 position: latlong,
//                 map: map
//             });
//             //creates circle
//             var circle = new google.maps.Circle({
//                 map: map,
//                 radius: 40233.6,    // 10 miles in metres
//                 fillColor: '#AA0000'
//             });
//             circle.bindTo('center', marker, 'position');
//         }
//         );
//     };





// Initialize Firebase (Gian's firebase)
var config = {
    apiKey: "AIzaSyA8I9SlIFCHxbgi3Y21Cwa9WXsmWvtAQTo",
    authDomain: "jamsesh-e7f96.firebaseapp.com",
    databaseURL: "https://jamsesh-e7f96.firebaseio.com",
    projectId: "jamsesh-e7f96",
    storageBucket: "",
    messagingSenderId: "190112220934"
  };
  firebase.initializeApp(config);

// code for saving login data to firebase
var database = firebase.database();

$("#loginbutton").click(function(e){
    e.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log("email ",email, " password ", password);
    loginResult = checkLogin(username, password);
    window.location = "profile.html";    

    // clear input boxes
    $("#email").val("");
    $("#password").val("");
    
 
});

$("#createbutton").click(function(e){

    e.preventDefault();
    //get values from new sign in
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var email = $("#newemail").val();
    var password = $("#newpassword").val();
    var zipcode = $("#zipcode").val();

    console.log(firstname, lastname, email, password, zipcode);
    // clear input boxes
    $("#firstname").val("");
    $("#lastname").val("");
    $("#newemail").val("");
    $("#newpassword").val("");
    $("zipcode").val("");
    
    // push to database
    database.ref().push({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        zipCode: zipcode,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    // opens profile windows
      window.location = "profile.html";    
});
