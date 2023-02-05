import "react-perfect-scrollbar/dist/css/styles.css";
import App from "App";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const { VERSION } = process.env;
const currentCacheName = `cache-every-file-${VERSION}`;

const SendNewVersionEvent = () => {
  const customEvent = new CustomEvent("new-version-available", {
    detail: { message: "Update" }
  });
  document.dispatchEvent(customEvent);
};

if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });

    caches.keys().then(async cacheNames => {
      const isCurrentVersion = !!cacheNames.find(cacheName => cacheName === currentCacheName);

      const cachesToDelete = cacheNames.filter(
        cacheName =>
          cacheName.startsWith("cache-every-file") &&
          cacheName !== `cache-every-file-${process.env.VERSION}`
      );

      console.log({ isCurrentVersion, cacheNames, cachesToDelete });

      await Promise.all(cachesToDelete.map(cacheName => caches.delete(cacheName)));

      if (!isCurrentVersion) {
        SendNewVersionEvent();
      }
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
