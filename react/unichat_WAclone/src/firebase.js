import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyCemfxIBae8_DKGrPA5_jQ67moBqbunyE4",
        authDomain: "messengerlutfi.firebaseapp.com",
        projectId: "messengerlutfi",
        storageBucket: "messengerlutfi.appspot.com",
        messagingSenderId: "372087732410",
        appId: "1:372087732410:web:9b53350bbc68f07bbaaa83"
}).auth();