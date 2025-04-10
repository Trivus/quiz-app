// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOaJ4-4rYXwOqg4xswmfFjsWxh2Xk55VA",
  authDomain: "quiz-6837e.firebaseapp.com",
  databaseURL: "https://quiz-6837e-default-rtdb.firebaseio.com",
  projectId: "quiz-6837e",
  storageBucket: "quiz-6837e.firebasestorage.app",
  messagingSenderId: "474989489839",
  appId: "1:474989489839:web:4809d6145677e831e32e5a",
  measurementId: "G-BST06S2VPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);