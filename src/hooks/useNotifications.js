import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { drugs, diseases } from '../content/data';

export function useNotifications() {
  const { state, dispatch } = useAppContext();
  const notificationTimes = state.settings.notificationTimes || ['21:00'];

  useEffect(() => {
    // Attempt permission request on load (mostly works on desktop, mobile needs user gesture)
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Register Background Sync for reliable notifications
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        // Schedule periodic sync for notifications
        if ('periodicSync' in registration) {
          registration.periodicSync.register('sync-notifications', {
            minInterval: 24 * 60 * 60 * 1000 // 24 hours
          }).catch((err) => {
            console.log('Periodic sync registration failed:', err);
          });
        }
      }).catch((err) => {
        console.log('Service Worker registration failed for sync:', err);
      });
    }

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
            // Check if exact time matches (within a 5-minute window to avoid missing it)
            if (currentHour === targetHour && currentMinute >= targetMinute && currentMinute < targetMinute + 5) {
              
              // Get the next unsent item
              const allItems = [...drugs, ...diseases];
              const sentIds = state.settings.sentNotificationIds || [];
              let unsentItems = allItems.filter(item => !sentIds.includes(item.id));

              if (unsentItems.length === 0) {
                unsentItems = allItems;
                dispatch({ type: 'RESET_SENT_NOTIFICATIONS' });
              }

              // Select the first unsent item
              const selectedItem = unsentItems[0];
              if (!selectedItem) return;

              // Format notification title and body
              const title = `مراجعة RxRefresh: ${selectedItem.nameAr}`;
              const body = selectedItem.mechanism?.tagline || selectedItem.overview || 'حان الوقت لمراجعة معلوماتك الدوائية اليوم!';
              
              // Trigger service worker notification for background compatibility
              navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                  body: body,
                  icon: '/pwa-192x192.png',
                  vibrate: [200, 100, 200],
                  tag: `card-${selectedItem.id}`
                });
              }).catch(() => {
                // Fallback to standard web notification
                new Notification(title, {
                  body: body,
                  icon: '/pwa-192x192.png'
                });
              });

              // Mark as notified for this time slot today
              localStorage.setItem(lastNotifiedKey, today);
              
              // Mark the item as sent to prevent repetition
              dispatch({
                type: 'MARK_NOTIFICATION_SENT',
                payload: { id: selectedItem.id }
              });
            }
          }
        });
      }
    };

    // Check every minute
    const interval = setInterval(checkAndNotify, 60000);
    // Also check immediately on mount
    checkAndNotify();

    return () => clearInterval(interval);
  }, [notificationTimes, state.settings.sentNotificationIds, dispatch]);
}
