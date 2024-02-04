// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwtEN5sv6HIN7L2DPcSWtCFbkPVhpKckI",
    authDomain: "printer-2cba1.firebaseapp.com",
    projectId: "printer-2cba1",
    storageBucket: "printer-2cba1.appspot.com",
    messagingSenderId: "924254946947",
    appId: "1:924254946947:web:b62d93140c0e84a82f3db6",
    measurementId: "G-2CVYGRMLBG"
};
// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     databaseURL: process.env.databaseURL,
//     projectId:"printer-2cba1",
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId
//   };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
