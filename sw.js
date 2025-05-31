const CACHE_NAME = 'kalender-cache-v3';

const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png'
];

// INSTALL – Cache alle Dateien
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// ACTIVATE – Alte Caches löschen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            )
        )
    );
});

// FETCH – Netzwerk → Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => response)
            .catch(() => caches.match(event.request))
    );
});