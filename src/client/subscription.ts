import { urlB64ToUint8Array, postToServer } from './helper';

export type PushRoute = `/${string}`;

/**
 * Subscribe to push notifications
 *
 * @param {string} PUBLIC_KEY - Your VAPID public key
 * @param {PushRoute} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 * @param {string} type - The `type` you want passed to the server for the subscribe action
 * @param {object} payload - Any additional data you want passed to the server for the subscribe action
 */
export async function subscribeToPush(
  PUBLIC_KEY: string,
  pushRoute: PushRoute = '/push',
  type = 'subscribe',
  payload: any = {}
) {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY)
  });

  const data = await postToServer(pushRoute, { subscription, type, payload });
  return data;
}

/**
 * Unsubscribe from push notifications
 *
 * @param {string} pushRoute - The route where push subscriptions are handled. *Must begin with a '/'*
 * @param {string} type - The `type` you want passed to the server for the subscribe action
 * @param {object} payload - Any additional data you want passed to the server for the subscribe action
 */
export async function unsubscribeFromPush(
  pushRoute: string = '/push',
  type = 'unsubscribe',
  payload = {}
): Promise<boolean> {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();

  if (!subscription) {
    return false;
  }

  postToServer(pushRoute, {
    subscription,
    type,
    payload
  });

  return await subscription?.unsubscribe();
}

/**
 * Get the current push subscription status
 */
export async function getPushSubscriptionStatus(): Promise<boolean> {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();

  if (!subscription) {
    return false;
  }

  return true;
}

/**
 * Get the current push subscription data. In case you are already subscribed
 * to push notifications, this will return the subscription data. Otherwise,
 * it will return `null`.
 */
export async function getSubscriptionData(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager.getSubscription();

  if (!subscription) {
    return null;
  }

  return subscription;
}