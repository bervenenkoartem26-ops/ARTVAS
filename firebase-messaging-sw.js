importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDN0ATyXH66a91B5f5xyCIIjLp1nN1vugg",
    authDomain: "artvas-722f6.firebaseapp.com",
    databaseURL: "https://artvas-722f6-default-rtdb.firebaseio.com",
    projectId: "artvas-722f6",
    storageBucket: "artvas-722f6.firebasestorage.app",
    messagingSenderId: "395618635567",
    appId: "1:395618635567:web:0e11091c3d766d56ce5bda",
    measurementId: "G-02MBC79J6E"
});

const messaging = firebase.messaging();

// Обработка фоновых уведомлений, когда приложение свернуто или закрыто
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Получено фоновое сообщение:', payload);
    const notificationTitle = payload.notification?.title || 'Новое сообщение';
    const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/ARTVAS/icon-192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
