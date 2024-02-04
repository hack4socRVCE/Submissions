import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import {get, ref, getDatabase, child} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyCUIb8JID6IVhI6H36bDkntXH8g2gHqfH8",
  authDomain: "lifebuoy-8161b.firebaseapp.com",
  databaseURL: "https://lifebuoy-8161b-default-rtdb.firebaseio.com",
  projectId: "lifebuoy-8161b",
  storageBucket: "lifebuoy-8161b.appspot.com",
  messagingSenderId: "562512068440",
  appId: "1:562512068440:web:87fd0e856a1084bdccaf2d",
  measurementId: "G-19HDQV34JZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const dbRef = ref(db)

let map;
let infoWindows = []
const ny = { lat: 40.76010, lng: -73.983002 };
const blr = {lat: 12.9716, lng: 77.5946}
const pes = {lat:12.934833162232344, lng:77.53507211285884}
const location = pes

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeId: "roadmap",
    zoom: 13,
    center: location,
    mapId: "6d77c92efad4c954"
  });
  map.setTilt(45); 
  addMarkers()
  map.addListener("click", ()=>{
    for (let infowindow of infoWindows)
    infowindow.close()
  })
}
  
window.initMap = initMap;


function addBuoy(buoyData, buoyId){
  let location = buoyData["location"]

  const svgMarker = {
    path: `M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M448,256
    c0,32.625-8.23,63.344-22.645,90.281l-67.123-44.75C364.461,287.602,368,272.219,368,256c0-16.211-3.539-31.594-9.768-45.523
    l67.123-44.75C439.77,192.656,448,223.383,448,256z M86.644,346.281C72.23,319.344,64,288.625,64,256
    c0-32.617,8.23-63.344,22.644-90.273l67.123,44.75C147.539,224.406,144,239.789,144,256c0,16.219,3.539,31.602,9.768,45.531
    L86.644,346.281z M208,256c0-26.469,21.531-48,48-48c26.469,0,48,21.531,48,48c0,26.469-21.531,48-48,48
    C229.531,304,208,282.469,208,256z M346.277,86.648l-44.75,67.125C287.6,147.547,272.219,144,256,144
    c-16.219,0-31.6,3.547-45.527,9.773l-44.75-67.125C192.656,72.234,223.375,64,256,64S319.344,72.234,346.277,86.648z
     M165.723,425.359l44.75-67.125C224.4,364.469,239.781,368,256,368c16.219,0,31.6-3.531,45.527-9.766l44.75,67.125
    C319.344,439.773,288.625,448,256,448S192.656,439.773,165.723,425.359z`,
    fillColor: "#FC2947",
    fillOpacity: 1.0,
    strokeWeight: 1,
    rotation: 0,
    scale: 0.05,
    anchor: new google.maps.Point(0, 20),
  }

const marker = new google.maps.Marker({
  icon: svgMarker,
  position: location,
  map: map,
  // animation: google.maps.Animation.DROP
});
let htmlString = `<div>
<h3>Bouy Id: ${buoyId}</h3>
<p>Number of devices: ${buoyData["numDevices"]}</p>
<p>Battery: ${buoyData["battery"]}</p>
</div>`
makeInfoWindow(marker, htmlString)

}


function addPhone(phoneData, phoneId){
  let location = phoneData["location"]
  let colour = "#FFF2CC"
  let flags = phoneData["flags"]

  if(flags["medical"])
    colour = "#FC2947"
  else if (flags["food"])
    colour = "#F7DB6A"
  else if (flags["disabledPeople"])
    colour="#FFA3FD"
  else
    colour = "#FFF1DC"
  
  

  let svg = `<svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M729.6 870.4c0 28.16-23.04 51.2-51.2 51.2H345.6c-28.16 0-51.2-23.04-51.2-51.2V179.2c0-28.16 23.04-51.2 51.2-51.2h332.8c28.16 0 51.2 23.04 51.2 51.2v691.2z" fill="${colour}" />
  <path d="M678.4 934.4H345.6c-35.84 0-64-28.16-64-64V179.2c0-35.84 28.16-64 64-64h332.8c35.84 0 64 28.16 64 64v691.2c0 35.84-28.16 64-64 64zM345.6 140.8c-21.76 0-38.4 16.64-38.4 38.4v691.2c0 21.76 16.64 38.4 38.4 38.4h332.8c21.76 0 38.4-16.64 38.4-38.4V179.2c0-21.76-16.64-38.4-38.4-38.4H345.6z" fill="#231C1C" />
  <path d="M691.2 744.96c0 12.8-11.52 23.04-25.6 23.04H358.4c-14.08 0-25.6-10.24-25.6-23.04V253.44c0-12.8 11.52-23.04 25.6-23.04h307.2c14.08 0 25.6 10.24 25.6 23.04v491.52z" fill="${colour}" />
  <path d="M665.6 780.8H358.4c-21.76 0-38.4-16.64-38.4-35.84V253.44c0-20.48 16.64-35.84 38.4-35.84h307.2c21.76 0 38.4 16.64 38.4 35.84v491.52c0 19.2-16.64 35.84-38.4 35.84zM358.4 243.2c-7.68 0-12.8 5.12-12.8 10.24v491.52c0 5.12 5.12 10.24 12.8 10.24h307.2c7.68 0 12.8-5.12 12.8-10.24V253.44c0-5.12-5.12-10.24-12.8-10.24H358.4z" fill="#231C1C" />
  <path d="M512 844.8m-38.4 0a38.4 38.4 0 1 0 76.8 0 38.4 38.4 0 1 0-76.8 0Z" fill="#231C1C" />
  <path d="M512 896c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2 51.2 23.04 51.2 51.2-23.04 51.2-51.2 51.2z m0-76.8c-14.08 0-25.6 11.52-25.6 25.6s11.52 25.6 25.6 25.6 25.6-11.52 25.6-25.6-11.52-25.6-25.6-25.6z" fill="#231C1C" />
  <path d="M460.8 166.4h102.4v25.6h-102.4z" fill="#231C1C" /></svg>`
  const svgMarker = {
    url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
    fillColor: "#FC2947",
    fillOpacity: 1.0,
    strokeWeight: 1,
    rotation: 0,
    anchor: new google.maps.Point(15, 15),
    
  }

const marker = new google.maps.Marker({
  icon: svgMarker,
  position: location,
  map: map,
  // animation: google.maps.Animation.DROP

});
let htmlString = `<div>
<h3>Request ID: ${phoneId}</h3>
<p>Number of People: ${phoneData["numPeople"]}</p>
<div class="textbox">
<p>${phoneData["distressMessage"]}</p>
</div>
</div>`
makeInfoWindow(marker, htmlString)

}

function makeInfoWindow(marker, htmlString){
  const infowindow = new google.maps.InfoWindow({
    content: htmlString, //U CAN PUT HTML HERE
    map:map,
    width: 500,

  });
  infoWindows.push(infowindow)
  
  marker.addListener("click", ()=>{
    infowindow.open({
      anchor: marker,
    });
  })
}


function addMarkers(){

  get(child(dbRef, "/")).then((snapshot) => {
    let data = snapshot.val()
    

    for (let buoyId in  data["buoys"]){
      let buoyData = data["buoys"][buoyId]
      addBuoy(buoyData, buoyId)
    }
    for (let phoneId in  data["test"]){

      let phoneData = data["test"][phoneId]
      phoneData = processData(phoneData, phoneId)
      console.log(phoneData)

      // for(let i =0; phoneData["flags"]["SOS"] && i<30;i++)
      //   beep();

      addPhone(phoneData, phoneId)
    }
  })
}

function processData(phoneData, phoneId){
  let emptyData = {
    "buoy": 70,
    "flags": {
      "SOS": false,
      "children": false,
      "disabledPeople": false,
      "food": false,
      "injured": false,
      "medical": false,
      "remarks": "NONE",
      "women": false
    },
    "location": {
      "lat": 40.854,
      "lng": -74
    },
    "numPeople": 5
  }
  if ("chall" in phoneData)
    emptyData["flags"]["remarks"] = phoneData["chall"]
  if ("children" in phoneData)
    emptyData["flags"]["children"] = phoneData["children"]
  if ("disabled" in phoneData) //maybe do &&==on
    emptyData["flags"]["disabledPeople"] = true 
  if("food" in phoneData)
    emptyData["flags"]["food"] = true
  if ("injured" in phoneData)
    emptyData["flags"]["injured"] = true
  if("medical" in phoneData)
    emptyData["flags"]["medical"] = true
  if("quantity" in phoneData)
    emptyData["numPeople"] = phoneData["quantity"]
  if("children" in phoneData)
    emptyData["flags"]["women"] = true

  let loc = getlocation(phoneData["lat"], phoneData["lon"], phoneId)
  emptyData["location"]["lat"] =  loc[0]
  emptyData["location"]["lng"] = loc[1]

  emptyData["distressMessage"] = phoneData["distressMessage"]
  return emptyData
}

// idk = {
//   "chall": "yes",
//   "children": "on",
//   "disabled": "on",
//   "food": "on",
//   "injured": "on",
//   "lat": "12.934833162232344",
//   "lon": "77.53507211285884",
//   "medical": "on",
//   "other": "on",
//   "quantity": "26",
//   "women": "on"
// }

setInterval(addMarkers, 1000);

function beep() {
  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
  snd.play();
}

/*
get location from db and make markers DONE
info window DONE
stuff in infowindow
location search 
bounce bounce
legend
*/

//strcmp("on", food_1)?0:1
function getlocation(lat, lon, phoneId){
  let loc = []
  loc[0] = parseFloat(lat)  + (parseFloat(phoneId.charAt(phoneId.length - 2))-1)/10000 + (parseFloat(phoneId.charAt(phoneId.length - 1))-1)/5000
  loc[1] = parseFloat(lon) + (parseFloat(phoneId.charAt(phoneId.length - 2))-1)/5000 + (parseFloat(phoneId.charAt(phoneId.length - 1))-1)/10000
  return loc
}

"parseFloat(phoneId.charAt(phoneId.length - 2))/100000 + parseFloat(phoneId.charAt(phoneId.length - 1))/100000"


/*
<div class="requirements">
  ${phoneData["flags"]["food"]?"<p>Food</p>":""}
  ${phoneData["flags"]["medical"]?"<p>Medical Emergency</p>":""}
</div>
<div class="people">
  ${phoneData["flags"]["injured"]?"<p>Medical Attention</p>":""}
  ${phoneData["flags"]["women"]?"<p>Women</p>":""}
  ${phoneData["flags"]["children"]?"<p>Children</p>":""}
  ${phoneData["flags"]["disabledPeople"]?"<p>Disabled People</p>":""}


</div>
 */