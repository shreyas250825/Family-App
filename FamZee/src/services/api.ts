import axios from 'axios';
import Constants from 'expo-constants';
import { secureStore } from '../utils/secureStore';


const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const session = await secureStore.getItemAsync('session');

  if (session) {
    const parsed = JSON.parse(session);
    // Supabase returns { access_token, refresh_token, token_type, expires_in }.
    const access_token = parsed?.access_token;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    } else {
      // If shape is unexpected, avoid sending an invalid token.
      delete config.headers.Authorization;
    }
  }
  return config;
});

export default api;
