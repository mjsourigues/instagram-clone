// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCiXGyYQZt8j0jG2t9vi1On698v30dXxcU",
    authDomain: "instagram-clone-ef1aa.firebaseapp.com",
    projectId: "instagram-clone-ef1aa",
    storageBucket: "instagram-clone-ef1aa.appspot.com",
    messagingSenderId: "423597467893",
    appId: "1:423597467893:web:bc4ae242bcba9793523dbc",
    measurementId: "G-CJ9QQB09TL",
});

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db, auth};
