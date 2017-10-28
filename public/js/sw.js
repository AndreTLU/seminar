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
    // Perform install steps
      console.log('Installing Service Worker!');
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });