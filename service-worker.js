const CACHE_NAME = "tsp-cbt-v2";

const FILES = [
  "/IPS-RESULT-PORTAL-/",
  "/IPS-RESULT-PORTAL-/index.html",
  "/IPS-RESULT-PORTAL-/admin-dashboard.html",
  "/IPS-RESULT-PORTAL-/student-cbt.html",
  "/IPS-RESULT-PORTAL-/exam-dashboard.html",
  "/IPS-RESULT-PORTAL-/firebase.js",
  "/IPS-RESULT-PORTAL-/manifest.json",
  "/IPS-RESULT-PORTAL-/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
