
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"></script>





var firebaseConfig = {
  apiKey: "AIzaSyBXPOGVP4z12TYHipn0-C8r55oGqAw523c",
  authDomain: "staff-support-b1ce3.firebaseapp.com",
  databaseURL: "https://staff-support-b1ce3.firebaseio.com",
  projectId: "staff-support-b1ce3",
  storageBucket: "staff-support-b1ce3.appspot.com",
  messagingSenderId: "1036048138694",
  appId: "1:1036048138694:web:654881679863092c8bb2c7",
  measurementId: "G-FF50GX1DM2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
var db = firebase.firestore();

const nameForm = document.getElementById("nameForm")
const nameInput = document.getElementById("name-input")
const nameBtn = document.getElementById("name-btn")
const messageScreen = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");

const id = uuid();
let name;


messageForm.addEventListener("submit",event =>{
    event.preventDefault();
    const text = msgInput.value;

    if(!text.trim())return;
     
    db.collection("chat").doc(id).set({
      name,
      text
    })
    .then(function(){
      console.log("document successfully written!")
    }).catch(function(error){
      console.error("error")

 });

});

const txt = document.querySelector('#msg-my');

function renderChat(doc){
 
  let text = doc.data().text;
  let name = doc.data().name;
  //name.textContent = doc.data().name;
  //text.textContent = doc.data().text;
  const msg = `<li class="msg ${ uuid==id && "my"}"><span>
  <i class="name">${name}:</i>${text}
     </span></li>`;

  
  messageScreen.innerHTML += msg
}




// db.collection('chat').get().then((onsnapshot)=>{
//   onsnapshot.docs.forEach(doc =>{
   
//     renderChat(doc);

//   })
  
// })
db.collection('chat').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change=>{
    if(change.type == 'added'){
      renderChat(change.doc);
    }
  })
})


nameForm.addEventListener("submit",e=>{
  e.preventDefault();
  if(nameInput.value.trim().length<4)
  return alert("Name should be more then 4 char");

  name = nameInput.value;
  nameForm.style.display= 'none';
  msgInput.removeAttribute('disabled');
  msgBtn.removeAttribute('disabled')
  return(name = nameInput.value);
})
