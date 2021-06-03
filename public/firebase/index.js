import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import "firebase/auth"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyArv4DTM-qcFnp8DUDpgmrTVys0YEVRgeU",
    authDomain: "clone-b.firebaseapp.com",
    databaseURL: "https://clone-b-default-rtdb.firebaseio.com",
    projectId: "clone-b",
    storageBucket: "clone-b.appspot.com",
    messagingSenderId: "112949392985",
    appId: "1:112949392985:web:2624f1ec2258fffea76348"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const storage = firebase.storage();
  export const db = firebase.firestore();
  export const auth = firebase.auth();


export default firebase;