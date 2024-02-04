import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDw2RwtRXVkyMLTiTDDHSYnwYJA_5KqRiY",
  authDomain: "jury-51df2.firebaseapp.com",
  projectId: "jury-51df2",
  storageBucket: "jury-51df2.appspot.com",
  messagingSenderId: "750070804342",
  appId: "1:750070804342:web:64e5b7db3ac649b2825457",
  measurementId: "G-7KV965ELSB"
=======
  apiKey: "AIzaSyCATh72NT2E79WqjFKmKX9b_G2NMQK6BIA",
  authDomain: "entry-fee59.firebaseapp.com",
  projectId: "entry-fee59",
  storageBucket: "entry-fee59.appspot.com",
  messagingSenderId: "1029854280515",
  appId: "1:1029854280515:web:2f9a4f76eabab9f4094df6",
  measurementId: "G-9HZ2095Q4X"
>>>>>>> 707300cb5b048bb34c58c47cea78b1991ae102c6
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export  const db = getFirestore (app);
export const auth = getAuth(app);
