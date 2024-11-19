// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE744QPg5QEKfDG9nTIQ5jnqbGn3V0jKY",
  authDomain: "flashkit-1f2ba.firebaseapp.com",
  projectId: "flashkit-1f2ba",
  storageBucket: "flashkit-1f2ba.appspot.com",
  messagingSenderId: "466379310808",
  appId: "1:466379310808:web:9d5b78c8c8c7da4f4d79ad",
  measurementId: "G-1R5CPZR9C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;