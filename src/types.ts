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
 * 
 */
export interface PushHandlerPlugin {
  pushReceived?(event: PushHandlerEnv): Promise<void>;
  pushClicked?(event: PushHandlerEnv): Promise<void>;
  pushDismissed?(event: PushHandlerEnv): Promise<void>;
  error?(error: PushHandlerEnv): Promise<void>;
}