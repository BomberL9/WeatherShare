import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBMpTwVWlXi-kHK4yj3j5PfW3Dulvw2AZk",
  authDomain: "personalapp-6c2e1.firebaseapp.com",
  projectId: "personalapp-6c2e1",
  storageBucket: "personalapp-6c2e1.appspot.com",
  messagingSenderId: "162587765329",
  appId: "1:162587765329:web:49dcb003166a4d94396670"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();