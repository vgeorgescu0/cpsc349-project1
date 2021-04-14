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

// Create instance for firestore
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); // This is to reduce errors in console