
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXh6U1FeCmMBTa-rLoGkEQN4SfberQo9M",
    authDomain: "document-management-genai.firebaseapp.com",
    projectId: "document-management-genai",
    storageBucket: "document-management-genai.appspot.com",
    messagingSenderId: "540410875774",
    appId: "1:540410875774:web:428881d47665cc86faad2f",
    measurementId: "G-PCWNH49H20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function uploadDoc(){
    var storage=firebase.storage();
}
