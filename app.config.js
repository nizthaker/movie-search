import 'dotenv/config';

export default {
  expo: {
    name: 'my-expo-app',
    slug: 'my-expo-app',
    version: '1.0.0',
    scheme: 'citroexpo',
    web: {
      favicon: './assets/favicon.png',
    },
    experiments: {
      tsconfigPaths: true,
    },
    plugins: ['expo-router'],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    extra: {
      tmdbApiKey: process.env.TMDB_API_KEY,
    },
  },
};
