let baseURL = '/';
self.addEventListener('push', event => {
    let json = event.data.json();
    console.log(json);
    baseURL = json.data.url;
    event.waitUntil(
        self.registration.showNotification(json.notification.title, {
            'body': json.notification.body,
            'tag': 'request',
            'actions': JSON.parse(json.data.action)
        })
    );
});
self.addEventListener('notificationclick', event => {
    self.clients.openWindow(baseURL);
    event.notification.close();
});