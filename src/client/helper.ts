/**
 * @fileoverview A set of helper functions used across the `client` sub-module 
 */

export async function postToServer(url: string, data: any): Promise<Response> {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

/**
 * Convert a base64 string to Uint8Array.
 * 
 * **Must be done so the server can understand the VAPID_PUBLIC_KEY**
 */
export const urlB64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};