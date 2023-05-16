import { urlB64ToUint8Array, postToServer } from './helper';

// create a string type that must begin with a '/'

/**
 * Subscribe to push notifications 
 * 
 * @param {string} PUBLIC_KEY - Your VAPID public key 
 * @param {string} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 */
export async function subscribeToPush(
  PUBLIC_KEY: string,
  pushRoute: string = '/push'
) {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY)
  });
  postToServer(pushRoute, { subscription, type: 'subscribe' });
}

/**
 * Unsubscribe from push notifications 
 * 
 * @param {string} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 */
export async function unsubscribeFromPush(pushRoute: string = '/push') {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  postToServer(pushRoute, {
    endpoint: subscription!.endpoint,
    type: 'unsubscribe'
  });
  await subscription?.unsubscribe();
}
