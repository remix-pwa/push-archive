/**
 * @fileoverview Types used across the package. To be re-exported from `index.ts`
 */

/**
 * 
 */
export type VapidDetails = {
  publicKey: string,
  privateKey: string,
  subject: string,
};

export interface NotificationObjectOptions extends NotificationOptions {
  body: string
}

export type NotificationObject = {
  title: string;
  options: NotificationObjectOptions
}