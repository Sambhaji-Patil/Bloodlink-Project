importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-app-compat.min.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/firebase/10.0.0/firebase-messaging-compat.min.js");

firebase.initializeApp({
    apiKey: "AIzaSyBrmFpQP-4_HxmQP7QAl7EVFWhSayRLsv8",
    authDomain: "messenger-bace1.firebaseapp.com",
    projectId: "messenger-bace1",
    storageBucket: "messenger-bace1.appspot.com",
    messagingSenderId: "911520687357",
    appId: "1:911520687357:web:9ff994ca263ef468d78a94",
    measurementId: "G-ZGCW8BW07Y"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message", payload);
    const { title, link_url, ...options } = payload.data;
    notification_options.data.link_url = link_url;

    // Customize notification here
    self.registration.showNotification(title, { ...notification_options, ...options });
});

self.addEventListener("notificationclick", (event) => {
    console.log("Click:", event);
    event.notification.close();

    event.waitUntil(clients.matchAll({ type: "window" }).then((clientList) => {
        console.log("what is client list", clientList);
        for (const client of clientList) {
            if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow && Boolean(event.notification.data.link_url)) return clients.openWindow(event.notification.data.link_url);
    }).catch(err => {
        console.log("There was an error waitUntil:", err);
    }));
});