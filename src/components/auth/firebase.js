import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyABIxtx0BnN6R_hXb92c3dNeLDYogUweiQ",
    authDomain: "the-room-5affc.firebaseapp.com",
    databaseURL: "https://the-room-5affc.firebaseio.com",
    projectId: "the-room-5affc",
    storageBucket: "",
    messagingSenderId: "503115811992",
    appId: "1:503115811992:web:0a2aa07fe1218f54"
};
// Initialize Firebase
const fireApp = firebase.initializeApp(firebaseConfig);

const db = fireApp.firestore();
const auth = fireApp.auth();

export default {db, auth};