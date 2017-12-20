 var config = {
    apiKey: "AIzaSyAqxMOrw8ja2VaIoqHUg6oJpuNC4QJY7-8",
    authDomain: "train-scheduler-9.firebaseapp.com",
    databaseURL: "https://train-scheduler-9.firebaseio.com",
    projectId: "train-scheduler-9",
    storageBucket: "train-scheduler-9.appspot.com",
    messagingSenderId: "242929805941"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  console.log(database);

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
 
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    // var firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequency = $("#frequency").val().trim();
   
    var newTrain = {
      trainName: trainName,
      destination: destination,
    //   firstTrain: firstTrain,
      frequency: frequency
    };
  
    database.ref().push(newTrain);

    console.log(trainName);
    console.log(destination);
    // console.log(firstTrain);
    console.log(frequency);

    alert("Your train of choice was added");
  
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
      console.log(childSnapshot.val());
      
      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
    //   var firstName = childSnapshot.val().firstTrain;
      var frequency = childSnapshot.val().frequency;
    
      console.log(trainName);
      console.log(destination);
    //   console.log(firstTrain);
      console.log(frequency);
    
    //  Add train time goes here
    
      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td></tr>");
  });