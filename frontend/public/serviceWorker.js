// /* eslint-disable no-restricted-globals */
// var CACHE_NAME = "resto-app-cache-v1";
// var cacheFiles = [
//   "/",
//   "/index.html",
//   "/manifest.json",
//   "/icon-72x72.png",
//   "/icon-96x96.png",
//   "/icon-128x128.png",
//   "/icon-144x144.png",
//   "/icon-152x152.png",
//   "/icon-192x192.png",
//   "/icon-384x384.png",
//   "/icon-512x512.png",
//   "/frontend/src/App.js",
//   "/frontend/src/components/AdminPanel.js",
//   "/frontend/src/components/Dashboard.js",
//   "/frontend/src/components/ForgotPassword.js",
//   "/frontend/src/components/ItemForm.js",
//   "/frontend/src/components/Login.js",
//   "/frontend/src/components/Navigation.js",
//   "/frontend/src/components/OrderManagement.js",
//   "/frontend/src/components/RegisterForm.js",
//   "/frontend/src/components/TableChoice.js",
//   "/frontend/src/components/TableContext.js",
//   "/frontend/src/components/TableOrders.js",
//   "/frontend/src/components/TableSelection.js",
//   "/frontend/src/index.css",
//   "/frontend/src/index.js",
//   // Ajoutez ici les chemins vers les fichiers statiques de votre application
// ];

// self.addEventListener("install", function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log("Opened cache");
//       return cache.addAll(cacheFiles);
//     })
//   );
// });

// self.addEventListener("activate", function(event) {
//   var cacheWhitelist = [CACHE_NAME];

//   event.waitUntil(
//     // Check de toutes les clés de cache.
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//           return cacheName;
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//   // Ignorer les requêtes provenant de schémas non pris en charge
//   if (event.request.url.startsWith("chrome-extension://")) {
//     return;
//   }

//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }

//       // IMPORTANT: Cloner la requête.
//       // Une requete est un flux et est à consommation unique
//       // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
//       var fetchRequest = event.request.clone();

//       return fetch(fetchRequest).then(function(response) {
//         if (!response || response.status !== 200 || response.type !== "basic") {
//           caches
//             .match("/")
//             .then(function(response) {
//               console.log("response", response);
//               return response;
//             })
//             .catch(function(error) {
//               console.log("error", error);
//             });
//         }

//         // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
//         var responseToCache = response.clone();

//         caches.open(CACHE_NAME).then(function(cache) {
//           cache.put(event.request, responseToCache);
//         });

//         return response;
//       });
//     })
//   );
// });
// ---------------------------------------------------------------------------

// const staticCacheName = "static-cache-v1";
// const assets = ["/", "/index.html"];

// self.addEventListener("install", (event) => {
//   console.log("Installation du service worker");
//   event.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       return cache.addAll(assets);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Activation du service worker");
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((cacheName) => {
//             return (
//               cacheName.startsWith("static-cache-") &&
//               cacheName !== staticCacheName
//             );
//           })
//           .map((cacheName) => {
//             return caches.delete(cacheName);
//           })
//       );
//     }),
//     self.clients.claim(),
//     self.clients.matchAll().then((clients) => {
//       const cspDirective =
//         "script-src 'nonce-{RANDOM}' 'strict-dynamic'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; frame-src 'none'; img-src 'none'; media-src 'none'; script-src 'nonce-{RANDOM}' 'strict-dynamic'; style-src 'nonce-{RANDOM}' 'strict-dynamic'; worker-src 'none'; font-src 'none'; connect-src 'none'; child-src 'none'; manifest-src 'none'; prefetch-src 'none'; block-all-mixed-content; upgrade-insecure-requests; default-src 'none'; sandbox allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-downloads-without-user-activation;";

//       // Pour limiter les risques de failles XSS, nous allons utiliser le Content Security Policy (CSP).

//       clients.forEach((client) => {
//         client.postMessage({
//           type: "cspDirective",
//           directive: cspDirective,
//         });
//       });
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Récupération des fichiers en cache");
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener("message", (event) => {
//   if (event.data.action === "skipWaiting") {
//     self.skipWaiting();
//   }
// });

// *****************************************
// ********************************************

// const staticCacheName = "static-cache-v1";
// const assets = ["/", "/index.html"];

// self.addEventListener("install", (event) => {
//   console.log("Installation du service worker");
//   event.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       return cache.addAll(assets);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Activation du service worker");
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((cacheName) => {
//             return (
//               cacheName.startsWith("static-cache-") &&
//               cacheName !== staticCacheName
//             );
//           })
//           .map((cacheName) => {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Récupération des fichiers en cache");
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener("message", (event) => {
//   if (event.data.action === "skipWaiting") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('activate', (event) => {
//   console.log('Activation du service worker');

//   // Directive Content-Security-Policy
//   const cspDirective = "script-src 'nonce-{RANDOM}' 'strict-dynamic'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; frame-src 'none'; img-src 'none'; media-src 'none'; script-src 'nonce-{RANDOM}' 'strict-dynamic'; style-src 'nonce-{RANDOM}' 'strict-dynamic'; worker-src 'none'; font-src 'none'; connect-src 'none'; child-src 'none'; manifest-src 'none'; prefetch-src 'none'; block-all-mixed-content; upgrade-insecure-requests; default-src 'none'; sandbox allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-downloads-without-user-activation;";

//   event.waitUntil(
//     self.clients.claim(),
//     self.clients.matchAll().then((clients) => {
//       clients.forEach((client) => {
//         client.postMessage({
//           type: 'cspDirective',
//           directive: cspDirective,
//         });
//       });
//     })
//   );
// });
