import { urlB64ToUint8Array, postToServer } from "./helper";

export async function subscribeToPush(VAPID_PUBLIC_KEY: string) {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
  });
  postToServer("/push", { subscription, type: "subscribe" });
}

export async function unsubscribeFromPush() {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  postToServer("/push", {
    endpoint: subscription!.endpoint,
    type: "unsubscribe",
  });
  await subscription?.unsubscribe();
}