import { urlB64ToUint8Array, postToServer } from './helper';

export type PushRoute = `/${string}`;

/**
 * Subscribe to push notifications 
 * 
 * @param {string} PUBLIC_KEY - Your VAPID public key 
 * @param {PushRoute} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 * @param {string} type - The `type` you want passed to the server for the subscribe action
 */
export async function subscribeToPush(
  PUBLIC_KEY: string,
  pushRoute: PushRoute = '/push',
  type = 'subscribe'
) {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY)
  });

  const data = await postToServer(pushRoute, { subscription, type });
  return data;
}

/**
 * Unsubscribe from push notifications 
 * 
 * @param {string} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 * @param {string} type - The `type` you want passed to the server for the subscribe action
 */
export async function unsubscribeFromPush(pushRoute: string = '/push', type = 'unsubscribe'): Promise<boolean> {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();
  
  if (!subscription) {
    return false;
  }

  postToServer(pushRoute, {
    endpoint: subscription,
    type
  });

  return await subscription?.unsubscribe();
}
