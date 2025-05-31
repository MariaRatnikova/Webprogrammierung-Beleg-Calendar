/* M7B: Service Worker Setup
 - Initialisierung des SW für Offline-Funktionalität
 - HTML, CSS, JS & Icons werden im Cache gespeichert
 - Grundlage für PWA-Offline-Modus
*/

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

// M7B: Installiere SW & cache Ressourcen install chace alle dateien
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// M7B: Aktiviere neuen Cache und lösche alte ACTIVATE – Alte Caches löschen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            )
        )
    );
});

// M7B: Network-First Strategie für Ressourcenabruf FETCH – Netzwerk → Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => response)
            .catch(() => caches.match(event.request))
    );
});