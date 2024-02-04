import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw2RwtRXVkyMLTiTDDHSYnwYJA_5KqRiY",
  authDomain: "jury-51df2.firebaseapp.com",
  projectId: "jury-51df2",
  storageBucket: "jury-51df2.appspot.com",
  messagingSenderId: "750070804342",
  appId: "1:750070804342:web:64e5b7db3ac649b2825457",
  measurementId: "G-7KV965ELSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const db = getFirestore (app);
export const auth = getAuth(app);
