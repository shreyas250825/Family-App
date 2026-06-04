import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  pushEnabled: boolean;
  toggleTheme: () => Promise<void>;
  updatePushSetting: (enabled: boolean) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'system',
  pushEnabled: true,
  toggleTheme: async () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(get().theme);
    const newTheme = themes[(currentIndex + 1) % themes.length];
    set({ theme: newTheme });
    await AsyncStorage.setItem('theme', newTheme);
  },
  updatePushSetting: async (enabled) => {
    set({ pushEnabled: enabled });
    await AsyncStorage.setItem('pushEnabled', JSON.stringify(enabled));
  },
  loadSettings: async () => {
    const theme = await AsyncStorage.getItem('theme');
    const pushEnabled = await AsyncStorage.getItem('pushEnabled');
    set({
      theme: (theme as 'light' | 'dark' | 'system') || 'system',
      pushEnabled: pushEnabled ? JSON.parse(pushEnabled) : true
    });
  }
}));
