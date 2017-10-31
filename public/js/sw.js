var cacheName = 'Seminaritoo-cache-v1';
var dataCacheName = 'data-v1';
var urlsToCache = [
    '/',
    '/public/index.html',
    './routes/ilm.js',
    './public/js/app.js',
    './public/js/home/home.html',
    './public/js/home/home.js',
    './public/js/sw.js',
    './server.js'
    
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
          return cache.addAll(urlsToCache);
        })
    );
});
  self.addEventListener('activate', function(event) {
        event.waitUntil(
            caches.keys().then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (key != cacheName && key !== dataCacheName) {
                        return caches.delete(key);
                    }
                }))
            })
    );
    }
);
self.addEventListener('fetch',
function (event) {
    if (event.request.url.indexOf("/api/ilm/ee") > -1) {
        event.respondWith(fetch(event.request)
                .then(function (response) {
                    caches.delete(dataCacheName);
                    return caches.open(dataCacheName).then(function (cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })}));
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
}
);