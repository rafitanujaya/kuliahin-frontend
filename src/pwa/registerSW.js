export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("SW registered:", registration);
    return registration;
  } catch (err) {
    console.error("SW registration failed:", err);
  }
};
