#include <Arduino.h>
#include <WiFiNINA.h>
#include <Firebase_Arduino_WiFiNINA.h>

#define FIREBASE_HOST "https://trafficsignalssit210-4-2hd-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "tEZCaJe9M9OnQw1mOtfcsuTeKRMV3l57eOA9nRzd"

const char* ssid = "Roshandeep's iPhone";
const char* pass = "roshandeep82";

FirebaseData fbData;
String fbPath = "/light/light"; // Path for the traffic light state

// Define constants for traffic light states
const String RED = "RED";
const String YELLOW = "YELLOW";
const String GREEN = "GREEN";
const String OFF = "OFF";

// Define pin numbers for traffic lights
const int redPin = 2;
const int yellowPin = 3;
const int greenPin = 4;

void setup() {
  Serial.begin(9600);

  // Set pin modes
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);

  // Connect to WiFi
  connectToWiFi();

  // Initialize Firebase connection
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, ssid, pass);
  Firebase.reconnectWiFi(true);

  // Set the initial state to "OFF"
  setTrafficLightState(OFF);
}

void loop() {
  // Fetch the current traffic light state from Firebase
  String lightState = getTrafficLightState();

  // Check if the state is valid and control the traffic lights accordingly
  if (lightState == RED || lightState == YELLOW || lightState == GREEN || lightState == OFF) {
    controlTrafficLight(lightState);
  } else {
    Serial.println("Error: Invalid state received");
  }

  // Delay to prevent constant fetching from Firebase (adjust as needed)
  delay(1000);
}

// Function to connect to the WiFi network
void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid, pass);
    for (int i = 0; i < 5 && WiFi.status() != WL_CONNECTED; i++) {
      Serial.print(".");
      delay(1000);
    }
  }

  Serial.println();
  Serial.println("Connected to WiFi network: ");
  Serial.println(ssid);
  Serial.print("Local IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

// Function to set the traffic light state in Firebase
void setTrafficLightState(String state) {
  if (Firebase.setString(fbData, fbPath, state)) {
    Serial.print("Firebase state set to: ");
    Serial.println(state);
  } else {
    Serial.print("Error setting Firebase state: ");
    Serial.println(fbData.errorReason());
  }
}

// Function to fetch the current traffic light state from Firebase
String getTrafficLightState() {
  if (Firebase.getString(fbData, fbPath)) {
    return fbData.stringData();
  } else {
    Serial.print("Error fetching Firebase state: ");
    Serial.println(fbData.errorReason());
    return "ERROR";  // Return an error value if the fetch fails
  }
}

// Function to control the traffic lights based on the state
void controlTrafficLight(String state) {
  if (state == RED) {
    digitalWrite(redPin, HIGH);
    digitalWrite(yellowPin, LOW);
    digitalWrite(greenPin, LOW);
    Serial.println("RED LED ON");
  } else if (state == YELLOW) {
    digitalWrite(redPin, LOW);
    digitalWrite(yellowPin, HIGH);
    digitalWrite(greenPin, LOW);
    Serial.println("YELLOW LED ON");
  } else if (state == GREEN) {
    digitalWrite(redPin, LOW);
    digitalWrite(yellowPin, LOW);
    digitalWrite(greenPin, HIGH);
    Serial.println("GREEN LED ON");
  } else if (state == OFF) {
    digitalWrite(redPin, LOW);
    digitalWrite(yellowPin, LOW);
    digitalWrite(greenPin, LOW);
    Serial.println("Traffic light OFF");
  } else {
    Serial.println("Invalid state");
  }
}
