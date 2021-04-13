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

// Create selector for html elements on index.html
const form = document.querySelector('#add-dog-form');
const list = document.querySelector('#dog-list');
const swipe = document.querySelector('#right-swipes');

// Listener to submit button from form, instead of default it performs add function
form.addEventListener('submit', (event) => {
    event.preventDefault();
    add(form.name.value, form.phone.value, form.location.value, form.img.value);
    form.name.value = '';
    form.phone.value = '';
    form.location.value = '';
    form.img.value = '';
});

// function to render onto html all the documents in the firestore
// along with ability to delete documents from firestore
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

// function to get all the dog's currently in the database
function getAll() {
    'use strict';
    document.getElementById("dog-list").innerHTML = '';
    db.collection('dogs').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderList(doc);
        });
    });
}

// run function to display the information right when the site loads
getAll();

// render's the swipe action to add the relevant info onto the main page
// for one document in firestore (associated to the picture swiped)
function renderSwipe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let phone = document.createElement('span');
    let location = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    phone.textContent = doc.data().phone;
    location.textContent = doc.data().location;

    li.appendChild(name);
    li.appendChild(phone);
    li.appendChild(location);

    swipe.appendChild(li);
}

// function to get information from one document in firestore
// pass in the img_url in order to obtain rest of important information
// and displays this on the page. use command 'get("img/dog2.jpg");' in console
// to see the function working correctly, able to change img to display different info
function get(img_url) {
    'use strict';
    db.collection("dogs").where("img", "==", img_url).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            renderSwipe(doc);
        });
    });
}

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