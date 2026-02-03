import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core';


self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener("push", (event) => {
  let data = {
    title: "Notifikasi",
    body: "Ada pesan baru 👀",
    url: "/",
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/AppImages/android/android-launchericon-192-192.png",
      badge: "/AppImages/android/android-launchericon-192-192.png",
      data: { url: data.url },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        for (const client of clientsArr) {
          if (client.url.includes(event.notification.data.url)) {
            return client.focus();
          }
        }
        return self.clients.openWindow(event.notification.data.url);
      })
  );
});
