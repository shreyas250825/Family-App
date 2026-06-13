export default {
  expo: {
    name: 'FamZee',
    slug: 'famzee',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#F8FAFF',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.famzee.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#F8FAFF',
      },
      package: 'com.famzee.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      API_URL: process.env.API_URL || 'http://localhost:5000/api',
      SUPABASE_URL: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
    },
  },
};
