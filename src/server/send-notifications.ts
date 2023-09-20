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

export type sendNotificationParams = {
  subscriptions: PushSubscription[];
  vapidDetails: VapidDetails;
  notification: NotificationObject;
  ttl?: number;
  log?: boolean;
};

export const sendNotifications = ({
  subscriptions,
  vapidDetails,
  notification,
  ttl,
  log = true
}: sendNotificationParams) => {
  // Customize how the push service should attempt to deliver the push message.
  // And provide authentication information.
  const options = {
    TTL: (ttl ??= 10_000),
    vapidDetails: vapidDetails
  };

  const webpush = require('web-push');

  // Send a push message to each client specified in the subscriptions array.
  // (ShafSpecs): Switched to map for faster execution time.
  subscriptions.map((subscription) => {
    const endpoint = subscription.endpoint;
    const id = endpoint.substr(endpoint.length - 8, endpoint.length);
    webpush
      .sendNotification(subscription, JSON.stringify(notification), options)
      .then((result: { statusCode: any }) => {
        if (log) {
          console.log(`Endpoint ID: ${id}`);
          console.log(`Result: ${result.statusCode}`);
        }

        return result;
      })
      .catch((error: any) => {
        if (log) {
          console.log(`Endpoint ID: ${id}`);
          console.log(`Error: ${error} `);
        }

        return error;
      });
  });
};
