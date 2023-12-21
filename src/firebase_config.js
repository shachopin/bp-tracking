import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCWicmfXhyN45eq8yLTuDXPosz6btobhVw",
  authDomain: "bp-measure-fe.firebaseapp.com",
  projectId: "bp-measure-fe",
  storageBucket: "bp-measure-fe.appspot.com",
  messagingSenderId: "161962739638",
  appId: "1:161962739638:web:441b5f4e43007c7413a317"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };