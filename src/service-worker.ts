/// <reference lib="WebWorker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache: string[] = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js', // Adjust with your actual file names
  '/static/js/0.chunk.js',    // Include all other relevant static files
  '/static/js/bundle.js',
  // Add other static resources you want to cache (CSS, images, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
        .then(response => {
          if (response) {
            return response; // Return the cached response if it exists
          }
          // If the response doesn't exist in the cache, you can choose to return a fallback page or a Response object
          return new Response("Network request failed and no cache available.");
        })
    })
  );
});

export {};
