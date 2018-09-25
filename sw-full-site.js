
const cacheName = 'v3';

self.addEventListener('install', e => {
  console.log("sw installed");
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
});