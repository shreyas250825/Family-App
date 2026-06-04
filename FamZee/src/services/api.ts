import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const session = await SecureStore.getItemAsync('session');
  if (session) {
    const { access_token } = JSON.parse(session);
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export default api;
