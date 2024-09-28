import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8t_NyXEYRrTkP0ATFLDekx__EoX-x-mA",
  authDomain: "trafficsignalssit210-4-2hd.firebaseapp.com",
  databaseURL: "https://trafficsignalssit210-4-2hd-default-rtdb.firebaseio.com",
  projectId: "trafficsignalssit210-4-2hd",
  storageBucket: "trafficsignalssit210-4-2hd.appspot.com",
  messagingSenderId: "87823174859",
  appId: "1:878231748595:web:cb4901b790bb531819dc86",
  measurementId: "G-XQN688P9C8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to update light status to RED
export function LED_RED() {
  set(ref(database, "light/"), {
    light: "RED",
  })
    .then(() => {
      document.getElementById("redStatus").innerHTML = "RED LED is ON";
    })
    .catch((error) => {
      console.error("Error updating RED LED:", error);
    });
}

// Function to update light status to GREEN
export function LED_GREEN() {
  set(ref(database, "light/"), {
    light: "GREEN",
  })
    .then(() => {
      document.getElementById("greenStatus").innerHTML = "GREEN LED is ON";
    })
    .catch((error) => {
      console.error("Error updating GREEN LED:", error);
    });
}

// Function to update light status to BLUE
export function LED_BLUE() {
  set(ref(database, "light/"), {
    light: "BLUE",
  })
    .then(() => {
      document.getElementById("blueStatus").innerHTML = "BLUE LED is ON";
    })
    .catch((error) => {
      console.error("Error updating BLUE LED:", error);
    });
}
