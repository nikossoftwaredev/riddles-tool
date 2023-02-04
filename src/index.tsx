import "react-perfect-scrollbar/dist/css/styles.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "App";

const { VERSION } = process.env;
const currentCacheName = `cache-every-file-${VERSION}`;

if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });

    navigator.serviceWorker.addEventListener("controllerchange", event => {
      // A new service worker has taken over, check if there's a new version of the app.

      event.waitUntil(
        caches.keys().then(async cacheNames => {
          const isCurrentVersion = cacheNames.find(cacheName => cacheName === currentCacheName);

          console.log({ isCurrentVersion });

          if (window.confirm("A new version of this app is available. Would you like to update?")) {
            await Promise.all(
              cacheNames
                .filter(cacheName => cacheName !== `cache-every-file-${process.env.VERSION}`)
                .map(cacheName => caches.delete(cacheName))
            );

            window.location.reload();
          }

          console.log("Deleting old cache");
        })
      );
    });
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path='/:tabName' element={<App />} />
      <Route path='*' element={<Navigate to='/search' />} />
    </Routes>
  </Router>
);
