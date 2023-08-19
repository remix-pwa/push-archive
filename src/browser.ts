if (typeof window === 'undefined') {
  throw new Error('This entry point is intended for browser usage only.');
}

// client
export { subscribeToPush, unsubscribeFromPush, getPushSubscriptionStatus } from './client/subscription';
export type { PushRoute } from './client/subscription';

// push 
export { Push } from './push/strategy'

// types
export type { NotificationObject, VapidDetails, PushHandlerEnv, PushPlugin, PushType } from './types';
