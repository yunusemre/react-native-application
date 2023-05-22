import axiosInterceptor from '@api/interceptor';
import Box from '@components/ui/box';
import theme from '@config/index';
import BarcodeScreen from '@pages/barcode-reader';
import HomeScreen from '@pages/home';
import LoginScreen from '@pages/login';
import MappingScreen from '@pages/map';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { setLocations } from '@store/features/app-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bgColor,
  },
};

const requestCameraPermission = async () => {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
  } catch (err) {
    console.warn(err);
  }
};

const Router = () => {
  axiosInterceptor();
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.apps);
  const setLocation = async () => {
    const location: any = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    let cor: any = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    dispatch(setLocations(cor));
  };

  useEffect(() => {
    setLocation();
  }, [location]);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      <NavigationContainer theme={navTheme}>
        <Drawer.Navigator useLegacyImplementation initialRouteName="home">
          <Drawer.Screen
            name="home"
            component={HomeScreen}
            options={{
              unmountOnBlur: true,
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="barcode"
            component={BarcodeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="mapping"
            component={MappingScreen}
            options={{
              unmountOnBlur: true,
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Router;
