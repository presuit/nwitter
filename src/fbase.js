import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBFmGurBDeqiWiDeXGbKPDTn4iiJ9G1Bhk",
    authDomain: "clonningnwitter.firebaseapp.com",
    databaseURL: "https://clonningnwitter.firebaseio.com",
    projectId: "clonningnwitter",
    storageBucket: "clonningnwitter.appspot.com",
    messagingSenderId: "1018588368857",
    appId: "1:1018588368857:web:769740dc1ddddf6a9a93c8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const fbaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
