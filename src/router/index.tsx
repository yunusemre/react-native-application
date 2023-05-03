import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { PermissionsAndroid, StyleSheet } from 'react-native';
import Box from '../components/ui/box';
import BarcodeScreen from '../pages/barcode-reader';
import HomeScreen from '../pages/home';
import LoginScreen from '../pages/login';
import MappingScreen from '../pages/map';

SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
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
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Router;
