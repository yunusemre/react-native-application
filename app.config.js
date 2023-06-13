export default () => ({
  expo: {
    name: 'Kolay Gelsin',
    slug: 'kolaygelsin-android-app',
    version: '1.0.0',
    orientation: 'portrait',
    platforms: ['android', 'ios'],
    icon: './assets/ic_launcher.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash_green.png',
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
        foregroundImage: './assets/ic_launcher.png',
        backgroundColor: '#3baf29',
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
      config: {
        googleMaps: { apiKey: 'AIzaSyBGMPNQUGGqclkGfN7bBHeZJyRKf1ciCMA' },
      },
    },
    ios: {
      supportsTablet: false,
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
          cameraPermission: 'Allow $(PRODUCT_NAME) to access camera.',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '29621779-a89d-48b1-b745-68a4337142bb',
      },
      API_URL: 'https://apibeta.klyglsn.com/api/request',
      test: {
        version: '1.0',
      },
      development: {
        version: '1.0.1',
      },
      preprod: {
        version: '1.1.1',
      },
      production: {
        version: '1.4.1',
      },
    },
    owner: 'yunusemretatar',
  },
});
