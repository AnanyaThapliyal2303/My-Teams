import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAL29ATa4h3OJQQWbJLqntCVT3vLSdrvf8",
    authDomain: "my-teams-172e9.firebaseapp.com",
    projectId: "my-teams-172e9",
    storageBucket: "my-teams-172e9.appspot.com",
    messagingSenderId: "982796833686",
    appId: "1:982796833686:web:b30abf62088fc3cdbcc3b7",
    measurementId: "G-8EHDX4NXNY"
});

const db = firebaseApp.firestore(); 
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;