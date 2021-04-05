/* eslint-disable no-unused-vars */
//needs scripts

//initialize firebase
var firebaseConfig = {
    //firebase config stuff
      };
    

firebase.initializeApp(firebaseConfig);

//make auth and firebase ref
const auth = firebase.auth();
const db = firebase.firestore();

//update firestore settings
db.settings({ timestampsInSnapshots: true});

function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.nodeValue, password.value).then(cred => {
        console.log(cred.user);
    })

    promise.catch(e => alert(e.message));

    window.location="home.html";
    alert("Signed Up!");
}

function signIn(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.nodeValue, password.value).then(cred => {
        console.log(cred.user);
    })

    promise.catch(e => alert(e.message));

    window.location="home.html";
    alert("Signed In!" + email.value);
}

function signOut(){

    auth.signOut().then(() => {
        console.log('user signed out');
    });
    window.location="home.html";
    alert("Signed Out!");

}

auth.onAuthStateChanged(function(user){

    if(user){
        console.log('user logged in: ', user);
        window.location="home.html";

        setupUI(user);

        var email = user.email;
        alert("Active User " + email);

    }
    else{
        setupUI();
        console.log('user logged out');
        alert("No Active User");
    }


});