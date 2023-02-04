/* eslint-disable no-restricted-globals */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log("Deleting old cache");
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== `cache-every-file-${process.env.VERSION}`)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
