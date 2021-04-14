const swipe = document.querySelector('#right-swipes');

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