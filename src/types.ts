/**
 * @fileoverview Types used across the package. To be re-exported from `index.ts`
 */

export type VapidDetails = {
  publicKey: string;
  privateKey: string;
  subject: string;
};

export interface NotificationObjectOptions extends NotificationOptions {
  body: string;
}

export type NotificationObject = {
  title: string;
  options: NotificationObjectOptions;
};

export interface PushHandlerEnv {
  event: PushEvent | NotificationEvent | ErrorEvent;
  state?: Record<string, any>;
}

/**
 * @interface PushPlugin
 * @description An interface for a plugin that handles push notifications.
 *
 * @property {function} pushReceived - Called when a push notification is received.
 * @property {function} pushClicked - Called when a push notification is clicked.
 * @property {function} pushDismissed - Called when a push notification is dismissed.
 * @property {function} error - Called when an error occurs.
 *
 * @example
 * ```ts
 * const plugin: PushPlugin = {
 *  pushReceived: async ({ event, state }) => {
 *   // Do something with the event and state
 *  },
 *  pushClicked: async ({ event, state }) => {
 *   // Do something with the event and state
 *  },
 *  pushDismissed: async ({ event, state }) => {
 *  // Do something with the event and state
 *  },
 *  error: async (error) => {
 *  // Do something with the error
 *  }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PushEvent | PushEvent}
 */
export interface PushPlugin {
  pushReceived?(event: PushHandlerEnv): Promise<void>;
  pushClicked?(event: PushHandlerEnv): Promise<void>;
  pushDismissed?(event: PushHandlerEnv): Promise<void>;
  error?(error: PushHandlerEnv): Promise<void>;
}

export type PushType = 'subscribe' | 'unsubscribe' | string;
