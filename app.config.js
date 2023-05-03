export default () => ({
  expo: {
    name: 'Kolay Gelsin',
    slug: 'kolaygelsin-android-app',
    version: '1.0.0',
    runtimeVersion: 'appVersion',
    orientation: 'portrait',
    platforms: ['android'],
    icon: './assets/ic_launcher.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
      // hdpi: '',
      // xhdpi: '',
      // xxhdpi: '',
      // xxxhdpi: ''
    },
    assetBundlePatterns: ['**/*'],
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/ic_launcher-1.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.cargo.ekol.ekolcargo',
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION',
        'CAMERA',
        'VIBRATE',
        'READ_CONTACTS',
        'CALL_PHONE',
      ],
    },
    plugins: [
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
      [
        'expo-barcode-scanner',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
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
      API_URL: 'https://apitest.klyglsn.com/api/request',
    },
    owner: 'ekolkargo',
  },
});
