import { createSubscribeApi } from "@/api/subscribeApi";
import { ENV } from "@/config";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export const subscribePushNotification = async (registration) => {
console.log('jalan gak sih push nya');
  if (!("PushManager" in window)) {
    throw new Error("Push not supported");
  }

  const existingSubscription =
    await registration.pushManager.getSubscription();

  if (existingSubscription) {
    return existingSubscription;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(ENV.PUBLIC_VAPID),
  });

  await createSubscribeApi(subscription);

  return subscription;
};
