// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBMXCTJLTbKpZB6p68EnVYIqMFpQB4yRZQ",
  authDomain: "txpurval.firebaseapp.com",
  projectId: "txpurval",
  storageBucket: "txpurval.firebasestorage.app",
  messagingSenderId: "3925062439",
  appId: "1:3925062439:web:74e54ef861cb0713b9af02",
  measurementId: "G-PQERDT8CCT"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Change to your icon
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});