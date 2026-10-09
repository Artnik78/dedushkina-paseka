const CACHE_NAME="dedushkina-paseka-v7";
const APP_SCOPE=new URL("./",self.location.href).pathname;
const APP_SHELL=[
  new URL("./",self.location.href).href,
  new URL("./index.html",self.location.href).href,
  new URL("./manifest-pwa.webmanifest",self.location.href).href
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>cache.addAll(APP_SHELL))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith("dedushkina-paseka-")&&k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;

  const url=new URL(event.request.url);

  // Service Worker работает только внутри журнала пасечника.
  if(url.origin!==self.location.origin || !url.pathname.startsWith(APP_SCOPE)) return;

  event.respondWith(
    fetch(event.request)
      .then(response=>{
        if(response.ok){
          const copy=response.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
        }
        return response;
      })
      .catch(()=>caches.match(event.request))
  );
});