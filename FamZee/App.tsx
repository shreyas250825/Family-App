import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from './src/store/authStore';
import { useNotificationService } from './src/services/notificationService';

export default function App() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const initNotifications = useNotificationService((state) => state.init);
  
  useEffect(() => {
    hydrate();
    initNotifications();
  }, []);
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
