import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCATh72NT2E79WqjFKmKX9b_G2NMQK6BIA",
  authDomain: "entry-fee59.firebaseapp.com",
  projectId: "entry-fee59",
  storageBucket: "entry-fee59.appspot.com",
  messagingSenderId: "1029854280515",
  appId: "1:1029854280515:web:2f9a4f76eabab9f4094df6",
  measurementId: "G-9HZ2095Q4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const db = getFirestore (app);
export const auth = getAuth(app);
