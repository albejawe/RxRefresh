// Service Worker for RxRefresh PWA
// Handles background notifications, sync, and offline functionality

// Workbox manifest injection point
self.__WB_MANIFEST;

const CACHE_NAME = 'rxrefresh-v1';

// Install event - cache resources
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((response) => {
          return response || new Response('Offline - Page not cached');
        });
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body || 'درس جديد في انتظارك',
        icon: data.icon || '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: data.tag || 'rxrefresh-notification',
        vibrate: data.vibrate || [200, 100, 200],
        requireInteraction: false,
        actions: [
          {
            action: 'open',
            title: 'افتح التطبيق'
          }
        ]
      };

      event.waitUntil(
        self.registration.showNotification(data.title || 'RxRefresh', options)
      );
    } catch (error) {
      console.error('Error parsing push notification:', error);
      event.waitUntil(
        self.registration.showNotification('RxRefresh', {
          body: event.data.text(),
          icon: '/pwa-192x192.png'
        })
      );
    }
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].url === '/' && 'focus' in clientList[i]) {
            return clientList[i].focus();
          }
        }
        // If not open, open it
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Background sync for periodic notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notifications') {
    event.waitUntil(
      (async () => {
        try {
          const settings = await getNotificationSettings();
          
          if (shouldNotify(settings)) {
            await self.registration.showNotification('RxRefresh - درس اليوم', {
              body: 'حان الوقت لاسترجاع معلوماتك وتحديث معرفتك الدوائية!',
              icon: '/pwa-192x192.png',
              badge: '/pwa-192x192.png',
              vibrate: [200, 100, 200],
              tag: 'daily-lesson'
            });
          }
        } catch (error) {
          console.error('Background sync failed:', error);
        }
      })()
    );
  }
});

// Helper function to get notification settings
async function getNotificationSettings() {
  return {
    notificationTime: '21:00',
    lastNotified: null
  };
}

// Helper function to check if should notify
function shouldNotify(settings) {
  if (!settings.notificationTime) return false;
  
  const now = new Date();
  const today = now.toDateString();
  
  if (settings.lastNotified === today) return false;
  
  const [targetHour, targetMinute] = settings.notificationTime.split(':').map(Number);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return currentHour === targetHour && 
         Math.abs(currentMinute - targetMinute) <= 2;
}
