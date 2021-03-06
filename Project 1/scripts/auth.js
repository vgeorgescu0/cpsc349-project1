/* eslint-disable no-unused-vars */

//needs scripts

//initialize firebase
var firebaseConfig = {
    //firebase config stuff
    apiKey: "AIzaSyCDavyv2LxT_y1_zHFAEbIZGERxEfAZR5w",
    authDomain: "cpsc349proj1.firebaseapp.com",
    projectId: "cpsc349proj1",
    storageBucket: "cpsc349proj1.appspot.com",
    messagingSenderId: "86082763535",
    appId: "1:86082763535:web:fee2adf1e213ffe1bbdc7a",
    measurementId: "G-WXB0F0PP9C"
};

console.log('running the FireBaseDataStore function');
firebase.initializeApp(firebaseConfig);

//make auth and firebase ref
const auth = firebase.auth();
const db = firebase.firestore();

//update firestore settings
db.settings({
    timestampsInSnapshots: true
});
function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    // [END auth_signup_password]
  }


function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.nodeValue, password.value).then(cred => {
        console.log(cred.user);
    })

    promise.catch(e => alert(e.message));

    window.location = "home.html";
    alert("Signed In!" + email.value);
}

function signOut() {

    auth.signOut().then(() => {
        console.log('user signed out');
    });
    window.location = "home.html";
    alert("Signed Out!");

}

auth.onAuthStateChanged(function (user) {

    if (user) {
        console.log('user logged in: ', user);
        window.location = "home.html";

        document.getElementById("signUp").style.display = "none";
        document.getElementById("signIn").style.display = "none";
        document.getElementById("signOut").style.display = "block";

        setupUI(user);

        var email = user.email;
        alert("Active User " + email);

    } else {

        document.getElementById("signUp").style.display = "block";
        document.getElementById("signIn").style.display = "block";
        document.getElementById("signOut").style.display = "none";

        setupUI();
        console.log('user logged out');
        alert("No Active User");
    }


});