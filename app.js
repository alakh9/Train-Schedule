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

var firstTime = "3:30"

var firstTimeConverted;
console.log("FIRST TIME CONVERTED " + firstTimeConverted);


var currentTime;
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime;
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder;
console.log(tRemainder);

console.log(destination);
//   console.log(firstTrain);
console.log(frequency);

console.log(database);

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var frequency = $("#frequency").val().trim();
  var firstTime = "3:30"

  firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log("FIRST TIME CONVERTED " + firstTimeConverted);


  currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);


  tRemainder = diffTime % frequency;
  console.log(tRemainder);

  console.log(destination);
  //   console.log(firstTrain);
  console.log(frequency);


  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    tRemainder: tRemainder

  };

  database.ref().push(newTrain);

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  alert("Your train of choice was added");

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var childRemainder = childSnapshot.val().tRemainder;



  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTime + "</td><td>" + childRemainder + "</td></tr>");
});