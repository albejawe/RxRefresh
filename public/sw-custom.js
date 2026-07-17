// Custom Service Worker Code for RxRefresh
// Handles notification clicks, redirection, and offline background scheduling

// 1. Handle notification click and navigation (direct redirect to card)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const tag = event.notification.tag; // e.g. "card-pyridostigmine"
  
  if (tag && tag.startsWith('card-')) {
    const id = tag.replace('card-', '');
    // Navigate to HashRouter route /#/card/:id
    const urlToOpen = new URL(`/#/card/${id}`, self.location.origin).href;
    
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
        // If the app is already open, navigate it to the card details page and focus it
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if ('focus' in client && 'navigate' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // If the app is closed, open a new window pointing directly to the card
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// 2. Background check and trigger notifications when app is closed (best effort via periodicSync & sync)
const checkAndShowNotification = async () => {
  try {
    const cache = await caches.open('rxrefresh-settings');
    const settingsResponse = await cache.match('/api/settings');
    const itemsResponse = await cache.match('/api/items');
    
    if (!settingsResponse || !itemsResponse) {
      console.log('SW: Settings or items not found in cache.');
      return;
    }
    
    const state = await settingsResponse.json();
    const items = await itemsResponse.json();
    
    if (!state || !state.settings || !items || items.length === 0) return;
    
    const notificationTimes = state.settings.notificationTimes || ['21:00'];
    const sentIds = state.settings.sentNotificationIds || [];
    
    const now = new Date();
    const today = now.toDateString();
    
    // Read last notified dates from cache
    let lastNotifiedDates = {};
    const lastNotifiedResponse = await cache.match('/api/last-notified');
    if (lastNotifiedResponse) {
      try {
        lastNotifiedDates = await lastNotifiedResponse.json();
      } catch (e) {
        lastNotifiedDates = {};
      }
    }
    
    let shouldNotify = false;
    let selectedTime = null;
    
    for (const targetTime of notificationTimes) {
      const [hours, minutes] = targetTime.split(':').map(Number);
      const targetDate = new Date();
      targetDate.setHours(hours, minutes, 0, 0);
      
      // If current time is past the target time today AND we haven't notified for this slot today yet
      if (now.getTime() >= targetDate.getTime() && lastNotifiedDates[targetTime] !== today) {
        shouldNotify = true;
        selectedTime = targetTime;
        break; // Only trigger one notification at a time
      }
    }
    
    if (shouldNotify && selectedTime) {
      // Find the next unsent item
      let unsentItems = items.filter(item => !sentIds.includes(item.id));
      if (unsentItems.length === 0) {
        unsentItems = items;
        state.settings.sentNotificationIds = []; // reset sent IDs if all are done
      }
      
      const selectedItem = unsentItems[0];
      if (selectedItem) {
        const title = `مراجعة RxRefresh: ${selectedItem.nameAr}`;
        const body = selectedItem.tagline || selectedItem.overview || 'حان الوقت لمراجعة معلوماتك الدوائية اليوم!';
        
        await self.registration.showNotification(title, {
          body: body,
          icon: '/pwa-192x192.png',
          vibrate: [200, 100, 200],
          tag: `card-${selectedItem.id}`
        });
        
        // Update last notified date for this time slot
        lastNotifiedDates[selectedTime] = today;
        await cache.put('/api/last-notified', new Response(JSON.stringify(lastNotifiedDates)));
        
        // Update sent notifications list in cache so it stays in sync
        state.settings.sentNotificationIds.push(selectedItem.id);
        await cache.put('/api/settings', new Response(JSON.stringify(state)));
        
        console.log('SW: Background notification sent successfully for card:', selectedItem.id);
      }
    }
  } catch (error) {
    console.error('SW: Error checking/sending background notification:', error);
  }
};

// Listen to Periodic Sync event (fired periodically by browser when app is closed)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-notifications') {
    event.waitUntil(checkAndShowNotification());
  }
});

// Listen to standard Sync event (fires when network reconnects or browser wakes up SW)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notifications' || event.tag === 'test-sync') {
    event.waitUntil(checkAndShowNotification());
  }
});
