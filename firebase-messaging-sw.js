importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_AUTH_DOMAIN",
  projectId: "ВАШ_PROJECT_ID",
  storageBucket: "ВАШ_STORAGE_BUCKET",
  messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
  appId: "ВАШ_APP_ID"
});

const messaging = firebase.messaging();

// Обработка фоновых сообщений (когда сайт закрыт)
messaging.onBackgroundMessage((payload) => {
  console.log('Получено фоновое сообщение: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // путь к иконке вашего приложения
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
