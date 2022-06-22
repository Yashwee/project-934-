//YOUR FIREBASE LINKS
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

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send()
{
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
    });
    document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name =message_data['name'];
message=message_data['message'];
like=message_data['like'];

name_with_tag="<h4>"+name+"<img class='user_tick' scr='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4><br>";
button_with_tag="<button class='btn btn-warning' onclick='updatelike(this.id)' id='"+firebase_message_id+"' value='"+like+"'>";
like2="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

row=name_with_tag+message_with_tag+button_with_tag+like2;
document.getElementById("output").innerHTML +=row;

//End code
    } });  }); }
getData();
function updatelike(message_id)
{
    console.log("clicked on a like button - "+message_id);
    button_id =message_id;
    likes =document.getElementById(button_id).value;
    updatedlikes=Number(likes) +1;
    console.log(updatedlikes);
    firebase.database().ref(room_name).child(message_id).update({
          like: updatedlikes
    });


}

function logout()
{
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html";
}