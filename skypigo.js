const firebaseConfig = {
	apiKey: "AIzaSyCm2QNg0ZlpTmDIJbBnzJeuTEt0_5nCgps",
	authDomain: "kwitter-2cc6b.firebaseapp.com",
	databaseURL: "https://kwitter-2cc6b-default-rtdb.firebaseio.com",
	projectId: "kwitter-2cc6b",
	storageBucket: "kwitter-2cc6b.appspot.com",
	messagingSenderId: "36828437073",
	appId: "1:36828437073:web:4daaef5a0ccb1a4e9ab670"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERe

user_name =localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML=" Welcome " +user_name+ " !";

function addroom()
{
room_name =document.getElementById("room_name").value;
localStorage.setItem("room_name",room_name);
firebase.database().ref("/").child(room_name).update({
  purpose:"room_name"
});
window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
	 Room_names = childKey;
	//Start code
  console.log("Room name - "+Room_names);
  row="<div class='room_name' id='"+Room_names+"' onclick='redirectRoomName(this.id)>#"+Room_names+"</div><hr>";
   document.getElementById("output").innerHTML+=row;
	//End code
	});});}
getData();

function redirectRoomName(name)
{
console.log(name);
localStorage.setItem("room_name",name);
window.location="kwitter_page.html";
}

function logout()
{
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="login.html";
}