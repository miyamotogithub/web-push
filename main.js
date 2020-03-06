// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBJQ9zfamI1Ewgmh4ZNpNJ_7R1FA8p0NqA",
    authDomain: "webpush-d22d0.firebaseapp.com",
    databaseURL: "https://webpush-d22d0.firebaseio.com",
    projectId: "webpush-d22d0",
    storageBucket: "webpush-d22d0.appspot.com",
    messagingSenderId: "511096896615",
    appId: "1:511096896615:web:6b82314947dddf524768c2"
};
function init() {
    console.log('loaded');

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
    messaging = firebase.messaging();
    console.log(messaging);
    messaging.usePubicVapidKey(
    'BFAaREMWt7fx1KXI34GTC23oC7Qy8LZsY2DyN5O20HpV29J1WqnbCvaZPLiQRii9mw0lNycbUcC5inNy523WG1Y');
};
function requestPermission() {
};
function deleteToken() {
};
