const CACHE_NAME = 'un-amigo-te-espera-v1';
const urlsToCache = [
  '/',
  '/indexref.html',
  '/css/tailwind.min.css',
  '/images/perro.jpg',
  '/manifest.json',
  '/refugio.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Almacenando archivos en caché');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error al almacenar en caché:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Error al recuperar del caché:', error);
      })
  );
});