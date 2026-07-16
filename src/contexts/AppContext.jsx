import { createContext, useContext, useEffect, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  userStats: {
    streak: 0,
    longestStreak: 0,
    totalPoints: 0,
    lastActiveDate: null,
  },
  completedCards: [], // Array of card IDs
  srsQueue: {}, // { [cardId]: { nextReview: timestamp, step: number (0,1,2 for 1d, 3d, 7d) } }
  quizHistory: [], // { cardId, type, correct, timestamp }
  settings: {
    notificationTimes: ['21:00'], // Array of times (HH:mm)
    sentNotificationIds: [], // Track sent drug/disease IDs to prevent repetition
  }
};

function init(initialData) {
  try {
    const localData = localStorage.getItem('rxrefresh_data');
    if (localData) {
      const parsed = JSON.parse(localData);
      // Check and update streak on load
      const today = new Date().toDateString();
      if (parsed.userStats.lastActiveDate !== today) {
        const lastActive = new Date(parsed.userStats.lastActiveDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActive.toDateString() !== yesterday.toDateString()) {
          // Missed a day
          parsed.userStats.streak = 0;
        }
      }
      
      // Migrate settings for multiple notifications
      if (parsed.settings) {
        if (!parsed.settings.notificationTimes) {
          parsed.settings.notificationTimes = [parsed.settings.notificationTime || '21:00'];
          delete parsed.settings.notificationTime;
        }
        if (!parsed.settings.sentNotificationIds) {
          parsed.settings.sentNotificationIds = [];
        }
      } else {
        parsed.settings = {
          notificationTimes: ['21:00'],
          sentNotificationIds: [],
        };
      }
      
      return { ...initialData, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load local data', e);
  }
  return initialData;
}

function reducer(state, action) {
  let newState = state;
  switch (action.type) {
    case 'MARK_ACTIVE_TODAY': {
      const today = new Date().toDateString();
      if (state.userStats.lastActiveDate !== today) {
        const newStreak = state.userStats.streak + 1;
        newState = {
          ...state,
          userStats: {
            ...state.userStats,
            streak: newStreak,
            longestStreak: Math.max(state.userStats.longestStreak, newStreak),
            lastActiveDate: today,
          }
        };
      }
      break;
    }
    case 'ANSWER_CARD': {
      const { cardId, correct, type } = action.payload; // type: 'quiz' or 'flashcard'
      const timestamp = Date.now();
      
      const newHistory = [...state.quizHistory, { cardId, type, correct, timestamp }];
      
      // SRS Logic
      let newSrsQueue = { ...state.srsQueue };
      let newCompleted = [...state.completedCards];
      
      if (correct) {
        if (!newCompleted.includes(cardId)) {
          newCompleted.push(cardId);
        }
        // If it was in SRS, remove or graduate it
        if (newSrsQueue[cardId]) {
          delete newSrsQueue[cardId];
        }
      } else {
        // SRS scheduling: 1 day, then 3 days, then 7 days
        const currentStep = newSrsQueue[cardId]?.step || 0;
        const intervals = [1, 3, 7]; // days
        const nextInterval = intervals[currentStep] || 7;
        
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);
        
        newSrsQueue[cardId] = {
          nextReview: nextReviewDate.getTime(),
          step: Math.min(currentStep + 1, 2)
        };
        
        // Remove from completed if it was there
        newCompleted = newCompleted.filter(id => id !== cardId);
      }
      
      newState = {
        ...state,
        quizHistory: newHistory,
        srsQueue: newSrsQueue,
        completedCards: newCompleted,
        userStats: {
          ...state.userStats,
          totalPoints: state.userStats.totalPoints + (correct ? 10 : 0)
        }
      };
      break;
    }
    case 'UPDATE_SETTINGS': {
      newState = { ...state, settings: { ...state.settings, ...action.payload } };
      break;
    }
    case 'MARK_NOTIFICATION_SENT': {
      const sentIds = state.settings.sentNotificationIds || [];
      if (sentIds.includes(action.payload.id)) break;
      newState = {
        ...state,
        settings: {
          ...state.settings,
          sentNotificationIds: [...sentIds, action.payload.id]
        }
      };
      break;
    }
    case 'RESET_SENT_NOTIFICATIONS': {
      newState = {
        ...state,
        settings: {
          ...state.settings,
          sentNotificationIds: []
        }
      };
      break;
    }
    default:
      return state;
  }
  
  localStorage.setItem('rxrefresh_data', JSON.stringify(newState));
  return newState;
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    dispatch({ type: 'MARK_ACTIVE_TODAY' });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
