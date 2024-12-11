import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Homework from './components/Homework';
import NavBar from './components/NavBar';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";
// import * as serviceWorkerRegistration from "../public/service-worker.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMXCTJLTbKpZB6p68EnVYIqMFpQB4yRZQ",
  authDomain: "txpurval.firebaseapp.com",
  projectId: "txpurval",
  storageBucket: "txpurval.firebasestorage.app",
  messagingSenderId: "3925062439",
  appId: "1:3925062439:web:74e54ef861cb0713b9af02",
  measurementId: "G-PQERDT8CCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

const App = () => {
  // Register the service worker (required for background notifications)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((error) => {
          console.error('Error registering service worker: ', error);
        });
    }
  }, []);  // Empty dependency array means this runs once when the component mounts.

  // Request permission to send notifications
  useEffect(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get the device token
        getToken(messaging, { vapidKey: 'BPopeaf_k3llQ-jXd9BKJApHeh2lWiofLMHM1pUnJIQuS5YzZe4rUq3FjizDt6YywWhXsHhqdubUwBEljL-49yY' })
          .then((currentToken) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);
              // Send this token to your server to send push notifications
            } else {
              console.error('No registration token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.error('An error occurred while retrieving token. ', err);
          });
      } else {
        console.error('Notification permission denied.');
      }
    });
  }, []);  // Empty dependency array means this runs once when the component mounts.

  // Handle incoming messages when the website is open
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      alert(`New Notification: ${payload.notification.title}${payload.notification.body}`);
    });
  }, []);  // Empty dependency array means this runs once when the component mounts.

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homework" element={<Homework />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
