import { createSlice, nanoid } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    fadingNotifications: []
  },
  reducers: {
    showNotification(state, action) {
      state.notifications.push({ id: nanoid(), text: action.payload });
    },
    startNotificationFading(state, action) {
      if (!state.fadingNotifications.includes(action.payload) &&
        state.notifications.find((notification) => notification.id === action.payload)) {
        state.fadingNotifications.push(action.payload);
      }
    },
    removeNotification(state, action) {
      state.notifications = [...state.notifications.filter((notification) => (
        notification.id !== action.payload
      ))];

      state.fadingNotifications = [...state.fadingNotifications.filter((notification) => (
        notification !== action.payload
      ))];
    }
  }
});

export const notificationsReducer = notificationsSlice.reducer;
export const { showNotification, startNotificationFading, removeNotification } = notificationsSlice.actions;
