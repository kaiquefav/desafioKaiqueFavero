import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAjEARDzQ5NbyRC9ytXVe2JNU9TalMpTgs",
    authDomain: "mb-enjoy.firebaseapp.com",
    databaseURL: "https://mb-enjoy.firebaseio.com",
    projectId: "mb-enjoy",
    storageBucket: "mb-enjoy.appspot.com",
    messagingSenderId: "471129997471",
    appId: "1:471129997471:web:569b1ca976dc84bbe8e2aa"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("carregando firebase")
  }
  
  var database = firebase.database();