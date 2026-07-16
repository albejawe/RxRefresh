import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

export function useNotifications() {
  const { state } = useAppContext();
  const targetTime = state.settings.notificationTime || '21:00'; // HH:mm

  useEffect(() => {
    // Request permission if not granted
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
        
        const [targetHour, targetMinute] = targetTime.split(':').map(Number);
        
        // Check if we already notified today
        const lastNotified = localStorage.getItem('rxrefresh_last_notified');
        const today = now.toDateString();
        
        if (lastNotified !== today) {
          // Check if exact time reached (or passed within 5 mins to avoid spam)
          if (currentHour === targetHour && currentMinute >= targetMinute && currentMinute < targetMinute + 5) {
            
            // Store notification time for service worker
            localStorage.setItem('rxrefresh_notification_time', targetTime);
            
            // Register Service Worker and use it to show notification (works better for PWA on Android)
            navigator.serviceWorker.ready.then(registration => {
              registration.showNotification('RxRefresh - درس اليوم', {
                body: 'حان الوقت لاسترجاع معلوماتك وتحديث معرفتك الدوائية!',
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
                vibrate: [200, 100, 200],
                tag: 'daily-lesson',
                requireInteraction: false,
                actions: [
                  {
                    action: 'open',
                    title: 'افتح التطبيق'
                  }
                ]
              });
            }).catch(() => {
              // Fallback to normal Web Notification
              new Notification('RxRefresh - درس اليوم', {
                body: 'حان الوقت لاسترجاع معلوماتك وتحديث معرفتك الدوائية!',
                icon: '/pwa-192x192.png'
              });
            });

            localStorage.setItem('rxrefresh_last_notified', today);
          }
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAndNotify, 60000);
    // Also check immediately on mount
    checkAndNotify();

    return () => clearInterval(interval);
  }, [targetTime]);
}
