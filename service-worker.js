import { workbox } from "workbox-sw";
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "document",
  workbox.strategies.networkFirst()
);
