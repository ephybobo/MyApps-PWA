const CACHE_NAME = "my apps";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/home.html",
    "/pages/product.html",
    "/css/materialize.min.css",
    "/css/materialize.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/materialize.js",
    "/js/nav.js",
    "/icon.png",
    "/img/me.png",
    "/img/html.png",
    "/img/javascript.png",
    "/img/nodejs.png",
    "/img/react.png",
    "/img/sql.png",
    "/img/footer.png",
    "/img/about.png",
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
   
            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
