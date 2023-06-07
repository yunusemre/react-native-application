import Box from '@components/ui/box';
import UiHeader from '@components/ui/header';
import UiOffline from '@components/ui/offline-banner';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '@router/bottom-tab';
import { persistor } from '@store/configure-store';
import { setLayoutHeight, setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import axios from 'axios';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { Dimensions } from 'react-native';
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
  const { isLogin, screenHeight } = useAppSelector((state) => state.apps);
  const { height }: { height: number } = Dimensions.get('screen');

  // const statusBarHeight = Constants.statusBarHeight * 2 + 44;
  // const bottomBar = 52;

  const getToken = async () => {
    return await AsyncStorage.getItem('access_token');
  };

  const Logout = async () => {
    axios.post('/releaseDevice', {}).then(() => dispatch(setLoginStatus(false)));
    await AsyncStorage.setItem('access_token', '');
    persistor.purge();
    navigation.navigate('login');
  };
  useEffect(() => {
    const layoutHeight = height - (Constants.statusBarHeight * 2 + 44 + 52);
    dispatch(setLayoutHeight(layoutHeight));
  }, []);

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
      {isHeader ? <UiHeader hasBack={hasBack} openBarcode={openBarcode} /> : null}
      <Box height={screenHeight}>{children}</Box>
      {isBottom ? <BottomTab /> : null}
      {isOnline === null || isOnline === true ? null : <UiOffline />}
    </Box>
  );
};

export default Layout;
