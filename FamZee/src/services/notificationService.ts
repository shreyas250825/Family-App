import { create } from 'zustand';
import * as Notifications from 'expo-notifications';

interface NotificationServiceState {
  init: () => Promise<void>;
  schedulePushNotification: (title: string, body: string) => Promise<void>;
}

export const useNotificationService = create<NotificationServiceState>((set) => ({
  init: async () => {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  },
  schedulePushNotification: async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data: 'goes here' },
      },
      trigger: null,
    });
  }
}));
