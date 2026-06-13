import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from './src/store/authStore';
import { useNotificationService } from './src/services/notificationService';
import { useAppBootstrap } from './src/hooks/useAppBootstrap';

function AppContent() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const initNotifications = useNotificationService((state) => state.init);

  useAppBootstrap();

  useEffect(() => {
    hydrate();
    initNotifications();
  }, []);

  return (
    <>
      <RootNavigator />
      <StatusBar style="dark" />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
