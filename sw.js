/* Stopper – Service Worker */
const CACHE = "stopper-cache-v2";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
const CACHEABLE_DESTINATIONS = new Set([
  "",
  "document",
  "font",
  "image",
  "manifest",
  "script",
  "style",
]);
/**
 * Determine if request should be handled by cache.
 * @param {Request} request
 * @returns {boolean}
 */

function shouldHandleRequest(request) {
  if (request.method !== "GET") return false;
  const reqUrl = new URL(request.url);
  if (reqUrl.origin !== self.location.origin) return false;
  return (
    request.mode === "navigate" ||
    CACHEABLE_DESTINATIONS.has(request.destination)
  );
}

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim())
      .then(() =>
        self.clients
          .matchAll({ type: "window" })
          .then((clients) =>
            clients.forEach((c) => c.postMessage({ type: "SW_UPDATED" })),
          ),
      ),
  );
});

self.addEventListener("fetch", (e) => {
  if (!shouldHandleRequest(e.request)) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r.ok) {
          const clone = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return r;
      })
      .catch(() => caches.match(e.request)),
  );
});
