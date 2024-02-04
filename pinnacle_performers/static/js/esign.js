// import { getStorage, ref } from "firebase/storage";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDXh6U1FeCmMBTa-rLoGkEQN4SfberQo9M",
//     authDomain: "document-management-genai.firebaseapp.com",
//     projectId: "document-management-genai",
//     storageBucket: "document-management-genai.appspot.com",
//     messagingSenderId: "540410875774",
//     appId: "1:540410875774:web:428881d47665cc86faad2f",
//     measurementId: "G-PCWNH49H20"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('save-btn').addEventListener('click', () => {
    // uploadDoc();
    const dataUrl = canvas.toDataURL(); // Convert the canvas to a data URL
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'signature.png'; // Set the filename
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a);
});


// function uploadDoc(){
//     const storage= getStorage();
//     const storageRef = ref(storage);
//     var file = document.getElementById('save-btn').files[0];

//     const thisRef = ref(storage, 'images/' + file.name);
//     const uploadTask = uploadBytesResumable(thisRef, file, metadata);

//     this.on(
//         'state_changed',
//         function(snapshot){
//             console.log("Uploaded successfully\n");
//         },
//         function(error)
//         {

//         },
//         function(){
//             var downloadUrl=uploadTask.snapshot.downloadURL;
//             console.log("got url");
//             alert("file uploaded successfully");
//         }
//     )
// }