import axios from 'axios';
import Constants from 'expo-constants';
import { secureStore } from '../utils/secureStore';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const session = await secureStore.getItemAsync('session');

  if (session) {
    const parsed = JSON.parse(session);
    const access_token = parsed?.access_token;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    } else {
      delete config.headers.Authorization;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(typeof message === 'string' ? message : 'Request failed'));
  }
);

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

export default api;
