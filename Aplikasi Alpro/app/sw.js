/* EksponenKu — service worker: semua berkas disimpan di cache agar aplikasi berjalan tanpa internet.
   Naikkan CACHE setiap kali ada perubahan berkas supaya perangkat siswa mengambil versi baru. */
var CACHE = 'eksponenku-v0.1.1';
var FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/math.js',
  'js/icons.js',
  'js/content.js',
  'fonts/nunito-latin.woff2',
  'fonts/nunito-latin-ext.woff2',
  'js/grader.js',
  'js/store.js',
  'js/app.js',
  'content/properties.js',
  'content/u1.js',
  'content/u2.js',
  'content/u3.js',
  'content/u4.js',
  'content/u5.js',
  'content/u6.js',
  'content/u7.js',
  'content/u8.js',
  'content/modeling.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.indexOf('/api/') === 0) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (req.mode === 'navigate') return caches.match('index.html');
        return new Response('', { status: 504 });
      });
    })
  );
});
