// Cache name can be versioned to manage updates.
const CACHE_NAME = 'Time Table';

// Install event: Cache the assets when the service worker is installed
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  self.skipWaiting(); // Immediately activate the service worker
});

// Activate event: Cleanup old caches during service worker activation
self.addEventListener('activate', (event) => {
  console.log('Service worker activated...');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName); // Remove old cache
          }
        })
      );
    })
  );
});

// Fetch event: Intercept network requests and cache responses dynamically
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch the request from the network
      return fetch(event.request).then((response) => {
        // Cache the new response for future use
        return caches.open(CACHE_NAME).then((cache) => {
          // Don't cache responses for requests that shouldn't be cached (e.g., dynamic data)
          if (event.request.method === 'GET' && response.status === 200) {
            console.log('Caching new resource:', event.request.url);
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
