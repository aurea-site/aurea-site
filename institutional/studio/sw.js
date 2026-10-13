const CACHE='aurea-studio-offline-v1';
const OFFLINE='/studio/offline.html';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(OFFLINE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('aurea-studio-offline-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
// Authenticated data and editor files always use the network.
self.addEventListener('fetch',event=>{if(event.request.method==='GET'&&event.request.mode==='navigate'&&new URL(event.request.url).pathname.startsWith('/studio'))event.respondWith(fetch(event.request).catch(()=>caches.match(OFFLINE)))});
