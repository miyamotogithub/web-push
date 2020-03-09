const messaging = firebase.messaging();
console.log(messaging);
//messaging.usePublicVapidKey("BFAaREMWt7fx1KXI34GTC23oC7Qy8LZsY2DyN5O20HpV29J1WqnbCvaZPLiQRii9mw0lNycbUcC5inNy523WG1Y");
messaging.onMessage(function(payload) {
	console.log('Message received. ', payload);
	// [START_EXCLUDE]
	// Update the UI to include the received message.
	//appendMessage(payload);
	// [END_EXCLUDE]
});
/*navigator.serviceWorker.register('./firebase-messaging-sw.js')
.then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
}).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
});*/

messaging.requestPermission();
var serviceWorker = navigator.serviceWorker;

/*ServiceWorkerRegistration.unregister().then(function(r) {
    console.log(r);
});*/
/**/
serviceWorker.register('firebase-messaging-sw.js').then(() => {
    return serviceWorker.ready;
}).then(regist => {
    messaging.useServiceWorker(regist);
    messaging.requestPermission().then(() => {
        messaging.getToken().then(token => {
            console.log(token);
        });
    });
});
/**/
/*
function requestPermission() {
    Notification.requestPermission()
    .then(function(permission) {
        if (permission === 'granted') {
            console.log('Notification permission granted');
            getToken();
        }
        else
            console.log('Unable to get permission to notify');
    });
};
function getToken() {
    messaging.getToken()
    .then(function(currentToken) {
        console.log(currentToken);
    }).catch(function(err) {
        console.log(err);
    })
}
*/
messaging.onTokenRefresh(function() {
    messageing.getToken()
    .then(function(refreshedToken) {
        console.log(refreshedToken);
    }).catch(function(err) {
        console.log(err);
    })
});
