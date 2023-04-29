export default () => ({
  expo: {
    name: 'Kolay Gelsin',
    slug: 'kolaygelsin-android-app',
    version: '1.0.0',
    orientation: 'portrait',
    platforms: ['android'],
    icon: './assets/ic_launcher.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/ic_launcher.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'],
      package: 'com.yunusemretatar.kolaygelsinandroidapp',
    },
    plugins: [
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
        },
      ],
    ],
    extra: {
      bugsnag: {
        apiKey: 'b33e9246b2a6275aedb9d27efeff3f6f',
      },
      eas: {
        projectId: '29621779-a89d-48b1-b745-68a4337142bb',
      },
      API_URL: 'http://192.168.2.108:3001',
    },
    owner: 'yunusemretatar',
  },
});
