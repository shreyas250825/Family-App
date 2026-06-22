import { AppData, createEmptyAppData } from './seedData';

const STORAGE_KEY = 'famzee-app-v2';

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const empty = createEmptyAppData();
      saveAppData(empty);
      return empty;
    }
    const parsed = JSON.parse(raw) as AppData;
    if (parsed.version !== 2) {
      localStorage.removeItem('famzee-app-v1');
      const empty = createEmptyAppData();
      saveAppData(empty);
      return empty;
    }
    return parsed;
  } catch {
    const empty = createEmptyAppData();
    saveAppData(empty);
    return empty;
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearAppData(): AppData {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('famzee-tour-dismissed');
  const empty = createEmptyAppData();
  saveAppData(empty);
  return empty;
}

export { compressImage } from './storageImages';
