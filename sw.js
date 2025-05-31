/* M7B: Service Worker Setup
 - Initialisierung des SW für Offline-Funktionalität
 - HTML, CSS, JS & Icons werden im Cache gespeichert
 - Grundlage für PWA-Offline-Modus
*/
/* M8A: Offline-Modus wurde mit Chrome DevTools getestet
 Vorgehen:
- DevTools > Application > Service Workers > "Offline" anhaken
- Seite neu laden → Kalender funktioniert vollständig offline
- Konsole geprüft: keine Fehler */

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

// M7B: I Install – Ressourcen beim ersten Laden cachen
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// M7B: Activate – Alten Cache entfernen, neuen aktivieren
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            )
        )
    );
});

// M7B + M8B: Fetch – Netzwerk zuerst, Fallback auf Cache bei Fehler
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => response)
            //wenn erfolgreich dann aw
            .catch(() => caches.match(event.request))
    );
});