import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBXq3D5860fikJ3pFVyt2RZXHS-KCx--e4",
    authDomain: "fir-myqua.firebaseapp.com",
    databaseURL: "https://fir-myqua.firebaseio.com",
    projectId: "fir-myqua",
    storageBucket: "fir-myqua.appspot.com",
    messagingSenderId: "495631997920",
    appId: "1:495631997920:web:96a2e0712ead4fd9fd6985",
    measurementId: "G-V3Y3410W5T"
  };
  
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();
  export default firebase;