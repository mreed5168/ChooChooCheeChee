var config = {
    apiKey: "AIzaSyCO0C5EnPnSzPD2UT2ikjVJ2md4ulvpWGc",
    authDomain: "timesheet-9f77c.firebaseapp.com",
    databaseURL: "https://timesheet-9f77c.firebaseio.com",
    storageBucket: "timesheet-9f77c.appspot.com",
    messagingSenderId: "73161317965"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();


var employeeName;
var role;
var startDate;
var monthlyRate;
var allIds = [];

$("#submit").on("click", function(event){
	event.preventDefault();
console.log("goodjob");
getUser();
})



function getUser() {
employeeName = $("#employeeName").val().trim();
role = $("#role").val().trim();
startDate = $("#startDate").val().trim();
monthlyRate = $("#monthlyRate").val().trim();
console.log(employeeName);
console.log(role);
console.log(startDate);
console.log(monthlyRate);




database.ref().push({
  name : employeeName,
  position : role,
  start : startDate,
  rate : monthlyRate,
});

};

database.ref().on("child_added", function(snapshot){

console.log(snapshot.val());

console.log(snapshot.val().name);

console.log(snapshot.val().position);

console.log(snapshot.val().start);

console.log(snapshot.val().rate);

});






