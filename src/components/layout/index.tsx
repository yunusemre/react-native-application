import Box from '@components/ui/box';
import UiHeader from '@components/ui/header';
import UiOffline from '@components/ui/offline-banner';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';

const Layout = ({
  isHeader = false,
  openBarcode,
  backgroundColor = theme.colors.primary,
  children,
}: {
  isHeader?: boolean;
  backgroundColor?: any;
  children: ReactNode;
  openBarcode?: any;
}) => {
  const isOnline = useIsConnected();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isLogin } = useAppSelector((state) => state.apps);

  const getToken = async () => {
    return await AsyncStorage.getItem('access_token');
  };

  const Logout = async () => {
    dispatch(setLoginStatus(false));
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

  return (
    <Box flex={1}>
      <StatusBar backgroundColor={backgroundColor} />
      {isHeader && <UiHeader openBarcode={openBarcode} />}
      <Box>{children}</Box>
      {isOnline === null || isOnline === true ? null : <UiOffline />}
    </Box>
  );
};

export default Layout;
