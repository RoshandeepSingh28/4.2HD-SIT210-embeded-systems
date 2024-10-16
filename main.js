// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA41QXmnL4nU1QOCSSJdwvDj97wVEgHtMA",
  authDomain: "hdsit210roshan2310994804.firebaseapp.com",
  databaseURL: "https://hdsit210roshan2310994804-default-rtdb.firebaseio.com",
  projectId: "hdsit210roshan2310994804",
  storageBucket: "hdsit210roshan2310994804.appspot.com",
  messagingSenderId: "146918088627",
  appId: "1:146918088627:web:fa3a266e66b716eda875c6",
  measurementId: "G-7CDTB5CKZ8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to update light status to RED
function LED_RED() {
  const dataRef = ref(database, "light/status/");
  set(dataRef, "RED")
    .then(() => {
      document.getElementById("redStatus").innerHTML = "RED LED is ON";
      document.getElementById("yellowStatus").innerHTML = "YELLOW LED is OFF";
      document.getElementById("greenStatus").innerHTML = "GREEN LED is OFF";
      
    })
    .catch((error) => {
      console.error("Error updating RED LED:", error);
    });
}

// Function to update light status to YELLOW
function LED_YELLOW() {
  const dataRef = ref(database, "light/status/");
  set(dataRef, "YELLOW")
    .then(() => {
      document.getElementById("redStatus").innerHTML = "RED LED is OFF";
      document.getElementById("yellowStatus").innerHTML = "YELLOW LED is ON";

      document.getElementById("greenStatus").innerHTML = "GREEN LED is OFF";
    })
    .catch((error) => {
      console.error("Error updating YELLOW LED:", error);
    });
}

// Function to update light status to GREEN
function LED_GREEN() {
  const dataRef = ref(database, "light/status/");
  set(dataRef, "GREEN")
    .then(() => {
      document.getElementById("redStatus").innerHTML = "RED LED is OFF";
      document.getElementById("yellowStatus").innerHTML = "YELLOW LED is OFF";
      document.getElementById("greenStatus").innerHTML = "GREEN LED is ON";
      
    })
    .catch((error) => {
      console.error("Error updating GREEN LED:", error);
    });
}

function OFF() {
  const dataRef = ref(database, "light/status/");
  set(dataRef, "OFF")
    .then(() => {
      document.getElementById("redStatus").innerHTML = "RED LED is OFF";
      document.getElementById("yellowStatus").innerHTML = "YELLOW LED is OFF";
      document.getElementById("greenStatus").innerHTML = "GREEN LED is OFF";
      
    })
    .catch((error) => {
      console.error("Error updating OFF:", error);
    });
}
// Make the functions globally available
window.LED_RED = LED_RED;
window.LED_GREEN = LED_GREEN;
window.LED_YELLOW = LED_YELLOW;
window.OFF=OFF;
