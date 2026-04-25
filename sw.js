const CACHE_NAME = 'ryokoplan-shell-v184';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/magazine/',
  '/my-trips/',
  '/offline.html',
  '/404.html',
  '/site.webmanifest',
  '/version.json',
  '/assets/css/styles.css',
  '/assets/js/app.js',
  '/assets/js/planner.js',
  '/assets/js/i18n.js',
  '/assets/js/storage.js',
  '/assets/images/brand/logo-mark.svg',
  '/assets/images/brand/favicon.svg',
  '/assets/images/brand/favicon-32.png',
  '/assets/images/brand/apple-touch-icon.png',
  '/assets/images/brand/icon-192.png',
  '/assets/images/brand/icon-512.png',
  '/assets/images/brand/og-cover.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_ASSETS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkThenCache(request) {
  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request).then(response => {
    if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  }).catch(() => null);
  return cached || networkPromise || Response.error();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await networkThenCache(request);
      } catch {
        return (await caches.match(request)) ||
          (await caches.match(url.pathname)) ||
          (await caches.match('/offline.html')) ||
          (await caches.match('/index.html')) ||
          Response.error();
      }
    })());
    return;
  }

  const destination = request.destination;
  if (['style', 'script', 'image', 'font', 'manifest'].includes(destination)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith((async () => {
    try {
      return await networkThenCache(request);
    } catch {
      return (await caches.match(request)) || (await caches.match(url.pathname)) || Response.error();
    }
  })());
});
