// This file kept for demonstration . Functionality replaced by "sw-full-site"
const cacheName = 'v2';

const cacheAssets = [
     '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    // '/js/dbhelper.js',
    '/js/main.js'
    // '/js/restaurant_info.js',
    // '/data/restaurants.json',
    // '/img/1.jpg',
    // '/img/2.jpg',
    // '/img/3.jpg',
    // '/img/4.jpg',
    // '/img/5.jpg',
    // '/img/6.jpg',
    // '/img/7.jpg',
    // '/img/8.jpg',
    // '/img/9.jpg',
    // '/img/10.jpg',
    // '/bg1-min.jpg'
];

self.addEventListener('install', e => {
  console.log("sw installed");
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
          console.log("caching");
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', function(e) {
  console.log("sw activated");
  e.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cache => {
                if(cache !== cacheName) {
                    console.log('sw clear existing caches');
                    return caches.delete(cache);
                }
            }))
    }))
});
self.addEventListener('fetch', e => {
    console.log('sw fetch');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});