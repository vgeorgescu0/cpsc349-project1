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
const list = document.querySelector('#dog-list');

// Listener to submit button from form, instead of default it performs add function
form.addEventListener('submit', (event) => {
    event.preventDefault();
    add(form.name.value, form.phone.value, form.location.value, form.img.value);
    form.name.value = '';
    form.phone.value = '';
    form.location.value = '';
    form.img.value = '';
});

function renderList(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let phone = document.createElement('span');
    let location = document.createElement('span');
    let img = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    phone.textContent = doc.data().phone;
    location.textContent = doc.data().location;
    img.textContent = doc.data().img;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(phone);
    li.appendChild(location);
    li.appendChild(img);
    li.appendChild(cross);

    list.appendChild(li);

    // deleting data
    cross.addEventListener('click', (event) => {
        if (confirm('Are you sure?')) {
            let id = event.target.parentElement.getAttribute('data-id');
            db.collection('dogs').doc(id).delete().then((snapshot) => {
            getAll();
        });
        } else {
            return false;
        }
    });
}

function getAll() {
    'use strict';
    document.getElementById("dog-list").innerHTML = '';
    db.collection('dogs').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderList(doc);
        });
    });
}

getAll();

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
        getAll();
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}