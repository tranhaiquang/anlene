// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB7w8-XUVZrcYE3yq-dJ7BT-9agvFyC2g",
  authDomain: "anlene-1a2e2.firebaseapp.com",
  projectId: "anlene-1a2e2",
  storageBucket: "anlene-1a2e2.firebasestorage.app",
  messagingSenderId: "338944804636",
  appId: "1:338944804636:web:10990229ca944f31131cd9",
  measurementId: "G-JLCBEHRJHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
