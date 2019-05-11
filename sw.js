//Files to be cached for offline
const urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Add array of files to be cahed for offline use.
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('rest_static_v1').then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch files from cache for offline or retrieve them as normal
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            else {
                return fetch(event.request)
                .then(function(response) {
                    const responseClone = response.clone();
                    caches.open('rest_static_v1').then(function(cache) {
                        cache.put(event.request, responseClone);
                    })
                    return response;
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
        })
    );
});
