// Setup API
const config = {
    apiKey: "AIzaSyCDavyv2LxT_y1_zHFAEbIZGERxEfAZR5w",
    authDomain: "cpsc349proj1.firebaseapp.com",
    projectId: "cpsc349proj1",
    storageBucket: "cpsc349proj1.appspot.com",
    messagingSenderId: "86082763535",
    appId: "1:86082763535:web:fee2adf1e213ffe1bbdc7a",
    measurementId: "G-WXB0F0PP9C"
};

// Initialize Firebase using above config
firebase.initializeApp(config);

// Create instance for auth and firestore
// var auth = firebase.auth(); commented due to not working on this at this time
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); // This is to reduce errors in console

// Create selector for html elements
const form = document.querySelector('#add-dog-form');


// Function to add dog to firestore using parameters from form below
function add(name, phone, location, img) {
    'use strict';
    db.collection("dogs").add({
        name: name,
        phone: phone,
        location: location,
        img: img
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

// Listener to submit button from form, instead of default it performs add function
form.addEventListener('submit', (event) => {
    event.preventDefault();
    add(form.name.value, form.phone.value, form.location.value, form.img.value);
    form.name.value = '';
    form.phone.value = '';
    form.location.value = '';
    form.img.value = '';
});