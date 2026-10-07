const CACHE_NAME="dedushkina-paseka-v6";
self.addEventListener("install",event=>{event.waitUntil(self.skipWaiting());});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(
    fetch(event.request,{cache:"no-store"}).then(response=>{
      const copy=response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});
      return response;
    }).catch(()=>caches.match(event.request))
  );
});