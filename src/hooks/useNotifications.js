import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { drugs, diseases } from '../content/data';

export function useNotifications() {
  const { state, dispatch } = useAppContext();
  const notificationTimes = state.settings.notificationTimes || ['21:00'];

  useEffect(() => {
    // 1. Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // 2. Register Background Sync and Periodic Sync
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Register periodic background sync
        if ('periodicSync' in registration) {
          registration.periodicSync.register('sync-notifications', {
            minInterval: 60 * 60 * 1000 // Check every hour in the background if possible
          }).catch((err) => {
            console.log('SW: Periodic sync registration failed:', err);
          });
        }
        
        // Register standard background sync as well (fires when browser wakes up)
        if ('sync' in registration) {
          registration.sync.register('sync-notifications').catch((err) => {
            console.log('SW: Background sync registration failed:', err);
          });
        }
      }).catch((err) => {
        console.log('SW: Service Worker ready check failed:', err);
      });
    }

    // 3. Helper to schedule next notification using Notification Triggers (Chrome/Edge support)
    const scheduleFutureTriggers = async () => {
      if ('Notification' in window && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
        // Check if TimestampTrigger is supported
        const supportsTriggers = 'showTrigger' in Notification.prototype || (typeof TimestampTrigger !== 'undefined');
        if (!supportsTriggers) return;

        const registration = await navigator.serviceWorker.ready;
        const allItems = [...drugs, ...diseases];
        const sentIds = state.settings.sentNotificationIds || [];
        let unsentItems = allItems.filter(item => !sentIds.includes(item.id));
        if (unsentItems.length === 0) {
          unsentItems = allItems;
        }

        const selectedItem = unsentItems[0];
        if (!selectedItem) return;

        const title = `مراجعة RxRefresh: ${selectedItem.nameAr}`;
        const body = selectedItem.mechanism?.tagline || selectedItem.overview || 'حان الوقت لمراجعة معلوماتك الدوائية اليوم!';

        notificationTimes.forEach(targetTime => {
          const [hours, minutes] = targetTime.split(':').map(Number);
          const targetDate = new Date();
          targetDate.setHours(hours, minutes, 0, 0);

          // If target time already passed today, schedule for tomorrow
          if (targetDate.getTime() <= Date.now()) {
            targetDate.setDate(targetDate.getDate() + 1);
          }

          const targetTimestamp = targetDate.getTime();
          const lastScheduledKey = `rxrefresh_last_scheduled_${targetTime}`;
          const lastScheduled = localStorage.getItem(lastScheduledKey);

          // Schedule if not already scheduled for this timestamp
          if (lastScheduled !== targetTimestamp.toString()) {
            try {
              registration.showNotification(title, {
                body: body,
                icon: '/pwa-192x192.png',
                vibrate: [200, 100, 200],
                tag: `card-${selectedItem.id}`,
                showTrigger: new TimestampTrigger(targetTimestamp)
              });
              localStorage.setItem(lastScheduledKey, targetTimestamp.toString());
              console.log(`SW Trigger: Scheduled offline notification for ${targetTime} (${new Date(targetTimestamp).toLocaleString()})`);
            } catch (e) {
              console.error('SW Trigger: Failed to register TimestampTrigger:', e);
            }
          }
        });
      }
    };

    scheduleFutureTriggers();

    // 4. Foreground timer checking (fires precisely on the minute when application is open)
    const checkAndNotify = () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const today = now.toDateString();

        notificationTimes.forEach(targetTime => {
          const [targetHour, targetMinute] = targetTime.split(':').map(Number);
          const lastNotifiedKey = `rxrefresh_last_notified_${targetTime}`;
          const lastNotified = localStorage.getItem(lastNotifiedKey);

          if (lastNotified !== today) {
            // Check if time matches (within a 5-minute window)
            if (currentHour === targetHour && currentMinute >= targetMinute && currentMinute < targetMinute + 5) {
              const allItems = [...drugs, ...diseases];
              const sentIds = state.settings.sentNotificationIds || [];
              let unsentItems = allItems.filter(item => !sentIds.includes(item.id));

              if (unsentItems.length === 0) {
                unsentItems = allItems;
                dispatch({ type: 'RESET_SENT_NOTIFICATIONS' });
              }

              const selectedItem = unsentItems[0];
              if (!selectedItem) return;

              const title = `مراجعة RxRefresh: ${selectedItem.nameAr}`;
              const body = selectedItem.mechanism?.tagline || selectedItem.overview || 'حان الوقت لمراجعة معلوماتك الدوائية اليوم!';
              
              navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                  body: body,
                  icon: '/pwa-192x192.png',
                  vibrate: [200, 100, 200],
                  tag: `card-${selectedItem.id}`
                });
              }).catch(() => {
                // Fallback to standard web notification if SW not ready
                new Notification(title, {
                  body: body,
                  icon: '/pwa-192x192.png'
                });
              });

              // Save last notified date
              localStorage.setItem(lastNotifiedKey, today);
              
              // Mark item as sent
              dispatch({
                type: 'MARK_NOTIFICATION_SENT',
                payload: { id: selectedItem.id }
              });

              // Save last notified to Cache for SW sync
              if ('caches' in window) {
                caches.open('rxrefresh-settings').then(cache => {
                  const lastNotifiedDates = {};
                  notificationTimes.forEach(t => {
                    const val = localStorage.getItem(`rxrefresh_last_notified_${t}`);
                    if (val) lastNotifiedDates[t] = val;
                  });
                  cache.put('/api/last-notified', new Response(JSON.stringify(lastNotifiedDates)));
                });
              }
            }
          }
        });
      }
    };

    // Check immediately and then every minute
    checkAndNotify();
    const interval = setInterval(checkAndNotify, 60000);

    return () => clearInterval(interval);
  }, [notificationTimes, state.settings.sentNotificationIds, dispatch]);
}
