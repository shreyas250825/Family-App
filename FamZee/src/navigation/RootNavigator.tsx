import React from 'react';
import { useAuthStore } from '../store/authStore';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

export const RootNavigator = () => {
  const { user, isLoading } = useAuthStore();
  if (isLoading) return null;
  return user ? <MainTabs /> : <AuthNavigator />;
};
