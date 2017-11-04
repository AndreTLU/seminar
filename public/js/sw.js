var cacheName = 'Seminaritoo-cache-v1';
var dataCacheName = 'data-v1';
var urlsToCache = [
    '/js/home/home.js',
    '/js/home/home.html',
    '/js/app.js',
    '/js/sw.js',
    '/index.html',
    '/'
];
self.addEventListener('install', function (event) {
    // Perform install steps
    console.log('Installing Service Worker!');
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('activate', function (event) {
    console.log('Activating Service Worker ' + cacheName);
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key != cacheName && key !== dataCacheName) {
                    console.log('Service Worker - Removing old data');
                    return caches.delete(key);
                }
            }))
        })
    ); return self.clients.claim();
}
);
self.addEventListener('fetch',
    function (event) {
        console.log('Service Worker - FETCH ', event.request.url);
        if (event.request.url.indexOf("https://seminaritoo.azurewebsites.net/api/ilm/ee") > -1) {
            event.respondWith(
                fetch(event.request)
                    .then(function (response) {
                        caches.delete(dataCacheName);
                        return caches.open(dataCacheName).then(function (cache) {
                            cache.put(event.request.url, response.clone());
                            return response;
                        })
                    })
            );
        } else {
            event.respondWith(
                caches.match(event.request).then(function (response) {
                    return response || fetch(event.request);
                })
            )
        }
    }
);
self.addEventListener('fetch', function(event){
    event.respondWith(
      caches.match(event.request)
            .then(function(response){
              return response ? response : fetch(event.request);
            })
    );
  });