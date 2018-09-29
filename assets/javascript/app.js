// $(document).ready(function() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzRAjjW0qDVWy7CzlS6bLBOUpvPwpMAkA",
    authDomain: "myapp-bab43.firebaseapp.com",
    databaseURL: "https://myapp-bab43.firebaseio.com",
    projectId: "myapp-bab43",
    storageBucket: "myapp-bab43.appspot.com",
    messagingSenderId: "710107190678"
  };
  firebase.initializeApp(config);
  
  // a var to represent the database
  var database = firebase.database();

  // Initial Values
  // var trainName = "";
  // var destination = "";
  // var firstTrainTime = "";
  // var frequency = "";

  // Capture Button Click
    $("#train-submit").on("click", function(){
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

    var trainData = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
      }

      database.ref().push(trainData)

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    moment(firstTrainTime, "h:mm:ss A").format("HH:mm:ss");

    var militaryTime = moment(firstTrainTime, "h:mm:ss A").format("HH:mm:ss");

    // moment(frequency).format("minutes");

    var inMinutes = moment(frequency).format("minutes");
    

    console.log(militaryTime);
    console.log(inMinutes);

  });

  












// });