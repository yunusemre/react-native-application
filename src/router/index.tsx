import axiosInterceptor from '@api/interceptor';
import Box from '@components/ui/box';
import theme from '@config/index';
import LoginScreen from '@pages/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useAppDispatch } from '@store/hooks';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import StackRouter from './stack-navigation';

SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bgColor,
  },
};

const Router = () => {
  axiosInterceptor();
  const dispatch = useAppDispatch();

  const setLocation = async () => {
    await Location.requestForegroundPermissionsAsync();
    const location: any = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    let cor: any = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    await AsyncStorage.setItem('location', JSON.stringify(cor));
  };

  useEffect(() => {
    setLocation();
    const getLocation = setInterval(() => setLocation(), 60 * 1000);
    return clearInterval(getLocation);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      <NavigationContainer theme={navTheme}>
        <Drawer.Navigator useLegacyImplementation initialRouteName="issues">
          <Drawer.Screen
            name="issues"
            component={StackRouter}
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
        </Drawer.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Router;
