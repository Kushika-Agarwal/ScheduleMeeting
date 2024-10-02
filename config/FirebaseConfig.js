// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "revisescheduler.firebaseapp.com",
  projectId: "revisescheduler",
  storageBucket: "revisescheduler.appspot.com",
  messagingSenderId: "589024998209",
  appId: "1:589024998209:web:6a5d8cbf2afadd7fd427c0",
  measurementId: "G-ZN2T387EX6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
