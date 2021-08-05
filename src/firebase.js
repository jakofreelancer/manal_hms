import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
});

const db = firebaseApp.firestore();

export { db };
export default firebase;
