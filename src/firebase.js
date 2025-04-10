// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY3UCSkSbzhoP9RZydMUuNSbXp000y65w",
  authDomain: "quiz-app-c4072.firebaseapp.com",
  projectId: "quiz-app-c4072",
  storageBucket: "quiz-app-c4072.firebasestorage.app",
  messagingSenderId: "966734352691",
  appId: "1:966734352691:web:6fd3f1c50d48e64c57ee46",
  measurementId: "G-TKR7ZPWP3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);