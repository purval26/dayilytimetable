importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js');

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyBMXCTJLTbKpZB6p68EnVYIqMFpQB4yRZQ",
  authDomain: "txpurval.firebaseapp.com",
  projectId: "txpurval",
  storageBucket: "txpurval.firebasestorage.app",
  messagingSenderId: "3925062439",
  appId: "1:3925062439:web:74e54ef861cb0713b9af02",
  measurementId: "G-PQERDT8CCT"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});