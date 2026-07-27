const CACHE_NAME = "tsp-cbt-v1";

const FILES = [
  "/IPS-RESULT-PORTAL-/",
  "/IPS-RESULT-PORTAL-/index.html",
  "/IPS-RESULT-PORTAL-/student-result.html",
  "/IPS-RESULT-PORTAL-/exam.html",
  "/IPS-RESULT-PORTAL-/exam-dashboard.html",
  "/IPS-RESULT-PORTAL-/firebase.js",
  "/IPS-RESULT-PORTAL-/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
