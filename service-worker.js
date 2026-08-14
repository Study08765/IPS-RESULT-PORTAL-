const CACHE_NAME = "tsp-cbt-v3";

const FILES = [
  "/IPS-RESULT-PORTAL-/",
  "/IPS-RESULT-PORTAL-/index.html",
  "/IPS-RESULT-PORTAL-/admin-dashboard.html",
  "/IPS-RESULT-PORTAL-/student-cbt.html",
  "/IPS-RESULT-PORTAL-/exam-dashboard.html",
  "/IPS-RESULT-PORTAL-/firebase.js",
  "/IPS-RESULT-PORTAL-/manifest.json",
  "/IPS-RESULT-PORTAL-/icon-192.png",
  "/IPS-RESULT-PORTAL-/icon-512.png"
];


/* ================================
   INSTALL
================================ */

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))

  );

});


/* ================================
   ACTIVATE
================================ */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});


/* ================================
   FETCH
================================ */

self.addEventListener("fetch", event => {

  /* केवल GET requests */

  if(event.request.method !== "GET"){
    return;
  }


  /* HTML/PAGE */

  if(event.request.mode === "navigate"){

    event.respondWith(

      fetch(event.request)

        .then(response => {

          const copy =
          response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {

              cache.put(
                event.request,
                copy
              );

            });

          return response;

        })

        .catch(() => {

          return caches.match(
            event.request
          );

        })

    );

    return;

  }


  /* STATIC FILES */

  event.respondWith(

    caches.match(event.request)

      .then(cachedResponse => {

        if(cachedResponse){

          return cachedResponse;

        }


        return fetch(event.request)

          .then(response => {

            if(
              !response ||
              response.status !== 200 ||
              response.type === "opaque"
            ){

              return response;

            }


            const copy =
            response.clone();


            caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  event.request,
                  copy
                );

              });


            return response;

          });

      })

  );

});
