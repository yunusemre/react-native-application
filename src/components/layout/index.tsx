import { BarcodeEdit } from '@components/ui/barcode-edit';
import Box from '@components/ui/box';
import UiHeader from '@components/ui/header';
import UiOffline from '@components/ui/offline-banner';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '@router/bottom-tab';
import { persistor } from '@store/configure-store';
import { setLayoutHeight, setLoginStatus, setUserInfo } from '@store/features/app-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import axios from 'axios';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Dialog } from 'react-native-paper';

const Layout = ({
  isHeader = false,
  isBottom = false,
  hasBack = false,
  openBarcode,
  backgroundColor = theme.colors.primary,
  setOpenEditModal,
  children,
}: {
  isHeader?: boolean;
  isBottom?: boolean;
  hasBack?: boolean;
  backgroundColor?: any;
  children: ReactNode;
  openBarcode?: any;
  setOpenEditModal?: any;
}) => {
  const isOnline = useIsConnected();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { isLogin, screenHeight } = useAppSelector((state) => state.apps);
  const { height }: { height: number } = Dimensions.get('screen');
  const [visible, setVisible] = useState(false);

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
    const barHeight =
      Platform.OS === 'android' ? Constants.statusBarHeight * 2 : Constants.statusBarHeight;
    const bottombar = isBottom ? 52 : 0;
    const headerHeight = 48;
    const screenHeightForDimention = height ?? 0;
    const layoutHeight = screenHeightForDimention - (barHeight + bottombar + headerHeight);
    dispatch(setLayoutHeight(layoutHeight));

    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    axios.post('/getUserInfo', {}).then((response) => {
      dispatch(setUserInfo(response));
    });
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
      <StatusBar style="dark" translucent backgroundColor={backgroundColor} />
      {isHeader ? <UiHeader hasBack={hasBack} openBarcode={openBarcode} /> : null}
      <Box height={screenHeight}>{children}</Box>
      {isBottom ? <BottomTab setOpenEditModal={() => setVisible(!visible)} /> : null}
      {isOnline === null || isOnline === true ? null : <UiOffline />}
      <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ borderRadius: 8 }}>
        <Box alignItems="center">
          <BarcodeEdit onDismiss={() => setVisible(false)} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default Layout;
