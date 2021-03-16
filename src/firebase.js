import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDCFkBkfY5q9KgVjhXwZn7nGI2Ktl9fmE0",
  authDomain: "bt3103-week-6-cdd4e.firebaseapp.com",
  projectId: "bt3103-week-6-cdd4e",
  storageBucket: "bt3103-week-6-cdd4e.appspot.com",
  messagingSenderId: "228639311595",
  appId: "1:228639311595:web:88d470ae3950ed832860ae",
  measurementId: "G-ELPJRBF46V",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
