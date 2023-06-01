import Box from '@components/ui/box';
import UiHeader from '@components/ui/header';
import UiOffline from '@components/ui/offline-banner';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '@router/bottom-tab';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

const Layout = ({
  isHeader = false,
  isBottom = false,
  hasBack = false,
  openBarcode,
  backgroundColor = theme.colors.primary,
  children,
}: {
  isHeader?: boolean;
  isBottom?: boolean;
  hasBack?: boolean;
  backgroundColor?: any;
  children: ReactNode;
  openBarcode?: any;
}) => {
  const isOnline = useIsConnected();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isLogin, username } = useAppSelector((state) => state.apps);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  };

  const Logout = async () => {
    dispatch(setLoginStatus(false));
    await axios.post('/releaseDevice', {});
    await AsyncStorage.setItem('access_token', '');
    persistor.purge();
    navigation.navigate('login');
  };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token === null) {
        Logout();
      }
    })();
  }, [isLogin]);

  // useEffect(() => {
  // axios.post('/getUserNotification', {}).then((response) => {
  //   console.log('getUserNotification', response);
  // });
  // EXIT
  // axios.post('/releaseDevice', {}).then((response) => {
  //   console.log('releaseDevice', response);
  // });
  // axios.post('/setDeviceInUse', {}).then((response) => {
  //   console.log('setDeviceInUse', response);
  // });
  // axios.post('/getUserInfo', {}).then((response) => {
  //   dispatch(setUserInfo(response));
  // });
  // axios.post('/getAllParameters', {}).then((response) => {
  //   dispatch(setAllParameters(response));
  // });
  // axios.post('/getCountries', {}).then((response) => {
  //   console.log('getCountries', response);
  // });
  // axios.post('/getMyTeamMembers', {}).then((response) => {
  //   console.log('getMyTeamMembers', response);
  // });
  // axios.post('/getUserMenu', {}).then((response) => {
  //   dispatch(setUserMenu(response));
  // });
  // }, []);

  return (
    <Box flex={1}>
      <StatusBar backgroundColor={backgroundColor} />
      {isHeader ? <UiHeader hasBack={hasBack} openBarcode={openBarcode} /> : null}
      <Box>{children}</Box>
      {isBottom ? <BottomTab /> : null}
      {isOnline === null || isOnline === true ? null : <UiOffline />}
    </Box>
  );
};

export default Layout;
