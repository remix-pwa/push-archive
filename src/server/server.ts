import { NotificationObject, VapidDetails } from '../types';
const webpush = require('web-push');

export type sendNotificationParams = {
  subscriptions: PushSubscription[];
  vapidDetails: VapidDetails;
  notification: NotificationObject;
  ttl?: number;
};

export const sendNotifications = ({
  subscriptions,
  vapidDetails,
  notification,
  ttl
}: sendNotificationParams) => {
  // Customize how the push service should attempt to deliver the push message.
  // And provide authentication information.
  const options = {
    TTL: (ttl ??= 10_000),
    vapidDetails: vapidDetails
  };

  // Send a push message to each client specified in the subscriptions array.
  subscriptions.forEach((subscription) => {
    const endpoint = subscription.endpoint;
    const id = endpoint.substr(endpoint.length - 8, endpoint.length);
    webpush
      .sendNotification(subscription, JSON.stringify(notification), options)
      .then((result: { statusCode: any }) => {
        console.log(`Endpoint ID: ${id}`);
        console.log(`Result: ${result.statusCode}`);
      })
      .catch((error: any) => {
        console.log(`Endpoint ID: ${id}`);
        console.log(`Error: ${error} `);
      });
  });
};
