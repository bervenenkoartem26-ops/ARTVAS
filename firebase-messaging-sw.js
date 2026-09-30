importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDN0ATyXH66a91B5f5xyCIIjLp1nN1vugg",
  authDomain: "artvas-722f6.firebaseapp.com",
  projectId: "artvas-722f6",
  messagingSenderId: "395618635567",
  appId: "1:395618635567:web:0e11091c3d766d56ce5bda"
});

// Уведомления с полем notification браузер показывает сам, когда приложение закрыто
firebase.messaging();
