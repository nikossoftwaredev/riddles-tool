import "react-perfect-scrollbar/dist/css/styles.css";
import { createRoot } from "react-dom/client";
import App from "./App";

if ("serviceWorker" in navigator) {
  if (process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
