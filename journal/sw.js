const CACHE_NAME="dedushkina-paseka-v16";
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

self.addEventListener("push",event=>{
  let payload={};
  try{payload=event.data?event.data.json():{}}catch(_){payload={body:event.data?.text?.()||""}}
  const title=payload.title||"Дедушкина пасека";
  const options={
    body:payload.body||"У вас новое напоминание из журнала пасечника.",
    icon:new URL("./icon-192.png",self.location.href).href,
    badge:new URL("./icon-192.png",self.location.href).href,
    tag:payload.tag||"dedushkina-paseka-reminder",
    data:{url:payload.url||new URL("./",self.location.href).href},
    renotify:false
  };
  event.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener("notificationclick",event=>{
  event.notification.close();
  const target=new URL(event.notification.data?.url||"./",self.location.href).href;
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const client of list){
      if(client.url.startsWith(self.registration.scope)&&"focus" in client){
        client.navigate(target);
        return client.focus();
      }
    }
    return clients.openWindow(target);
  }));
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