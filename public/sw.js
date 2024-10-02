self.addEventListener('push', event => {
    self.registration.showNotification('Anda Menerima Contact Pesan Baru', {
        body: 'Anda Menerima Pesan Baru Harap Lihat di menu Admin !',
        icon: 'path/to/icon.png',
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://sidaksulteng.id/admin')
    );
});