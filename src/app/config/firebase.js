import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBwsyUaFOzdzDIdvfbOgPiJm9G9YZP5w-Q",
    authDomain: "codeworkschat.firebaseapp.com",
    databaseURL: "https://codeworkschat.firebaseio.com",
    projectId: "codeworkschat",
    storageBucket: "",
    messagingSenderId: "702034159499",
    appId: "1:702034159499:web:200b0821c5255e38"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
