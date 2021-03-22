import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCBbW-5QrL4J92sFPzCTpO2ZesLrIvISw0",
    authDomain: "manal-bbf4e.firebaseapp.com",
    databaseURL: "https://manal-bbf4e-default-rtdb.firebaseio.com",
    projectId: "manal-bbf4e",
    storageBucket: "manal-bbf4e.appspot.com",
    messagingSenderId: "1034716497857",
    appId: "1:1034716497857:web:a0d6d4f2e27faecb5b5140",
    measurementId: "G-8V9LQ2BKLF"
	// apiKey: process.env.REACT_APP_FIREBASE_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    // appId: process.env.REACT_APP_MESSAGING_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const db = firebaseApp.firestore();

export { db };
export default firebase;