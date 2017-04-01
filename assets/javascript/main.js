var config = {
    apiKey: "AIzaSyA6GZrgit-EACA7iug5LSQ_7Al1SsieTus",
    authDomain: "trains-64227.firebaseapp.com",
    databaseURL: "https://trains-64227.firebaseio.com",
    storageBucket: "trains-64227.appspot.com",
    messagingSenderId: "143446148056"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

// Clicking submit calls getData function
$("#submit").on("click", function(event){
	event.preventDefault();
  getData();
})

// Functions ===================================

// This function is called by the submit button being clicked
// This function gathers data and pushes it to firebase
function getData() {
trainName = $("#trainName").val().trim();
destination = $("#destination").val().trim();
firstTrain = moment($("#firstTrain").val().trim(), "LT").format("X");
frequency = $("#frequency").val().trim();

// Pushing info to database
database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
  });

// Emptying divs after clicking submit
$("#trainName").val("");
$("#destination").val("");
$("#firstTrain").val("");
$("#frequency").val("");

};


// This function notices if a child is added to the database
// If a child is added the information is then added to the website
database.ref().on("child_added", function(snapshot){
var train = snapshot.val().trainName;
var dest = snapshot.val().destination;
var fTrain = snapshot.val().firstTrain;
var freq = parseInt(snapshot.val().frequency);
var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);
console.log(m);
var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");
var nextAr= moment(nextA).format("LT");
console.log(nextAr);
var minAway = moment(nextA).diff(moment(), "minutes")+1;
console.log(minAway);



$("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextAr + "</td><td>" + minAway + "</td></tr>");

});






