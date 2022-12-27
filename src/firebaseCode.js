// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYOrG_JV2XN0psuW1QurQS7OwW7vKMDXU",
  authDomain: "codedeck-b9dce.firebaseapp.com",
  projectId: "codedeck-b9dce",
  storageBucket: "codedeck-b9dce.appspot.com",
  messagingSenderId: "566280963049",
  appId: "1:566280963049:web:fe5ec1f206ee630d040178",
  measurementId: "G-QRFB5XC7S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth,db}