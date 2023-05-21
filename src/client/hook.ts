import { useState } from 'react';
import { subscribeToPush } from './subscription';

// function usePush(): { subscribe: () => Promise<void>; unsubscribe: () => Promise<boolean>; error: Error | null } {
//   const [error, setError] = useState<Error | null>(null);

//   async function subscribe(): Promise<void> {
//     try {
//       const permission = await Notification.requestPermission().then((permission) => {
//         if (permission === 'granted') {
//           const subscription = await subscribeToPush();
//           // Send subscription object to server for further processing
//         } else {
//           setError(new Error('Permission denied for push notifications'));
//         }
//       });
//     } catch (err) {
//       setError(err as unknown as Error);
//     }
//   }

//   return { subscribe, error };
// }