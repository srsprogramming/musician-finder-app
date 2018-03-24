var maxFM_Results = 10;

// last FM query fires automatically on page load. 
  //get artists name in Profile
  var artist = $("#artist-profile").text();

  // last FM keys
  var APIkey = "939610d3ede414a19a0eef9dd79b91ec";
  var sharedSecret = "326d21aff9cb4cb41af3e3bf2ae1e2c3";
  var lastFMURL =
    "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&user=rj&artist=" +
    artist +
    "&api_key=" +
    APIkey +
    "&format=json";

//Query is for top tracks
  $.ajax({
    url: lastFMURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    //loops and prints out top 10 tracks and the albums
    for(var count = 0; count < maxFM_Results; count++){

      var newTrack = $("<p>");
      newTrack.html((count+1) + ". "+ response.toptracks.track[count].name);
      $("#top-tracks").append(newTrack);
    }
  });

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

var database = firebase.database();

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

// select overdiv
// select id's through loop
// run ajax on each element. 
