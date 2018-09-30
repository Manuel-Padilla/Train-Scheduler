$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyCNkTVGyuaZoFNJRQsqHNZTjuGYheuX8UI",
    authDomain: "train-schedule-c38c9.firebaseapp.com",
    databaseURL: "https://train-schedule-c38c9.firebaseio.com",
    projectId: "train-schedule-c38c9",
    storageBucket: "train-schedule-c38c9.appspot.com",
    messagingSenderId: "315301794938"
  };
  firebase.initializeApp(config);

  // A variable to reference the database.
  var database = firebase.database();

  // set current time
  var myTimer = setInterval(myTimer, 1000);

  function myTimer() {
    var currentTime = new Date();
    $("#current-time").text(currentTime.toLocaleTimeString());
  }

  // Variables for the onClick event
  var name;
  var destination;
  var firstTrain;
  var frequency = 0;

  $("#add-train").on("click", function () {
    event.preventDefault();
    // Storing and retreiving new train data
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    // Pushing to database
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("form")[0].reset();
  });

  database.ref().on("child_added", function (childSnapshot) {
    
    // Change year so first train comes before now
    var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    // Difference between the current and firstTrain
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;
    // Minutes until next train
    var minAway = childSnapshot.val().frequency - remainder;
    // Next train time
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#train-schedule").append("<tr><td>" + childSnapshot.val().name +
      "</td><td>" + childSnapshot.val().destination +
      "</td><td>" + childSnapshot.val().frequency +
      "</td><td>" + nextTrain +
      "</td><td>" + minAway + "</td></tr>");

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
