import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { useIsConnected } from 'react-native-offline';
import theme from '../../config';
import { useAppSelector } from '../../store/hooks';
import Box from '../ui/box';
import UiHeader from '../ui/header';
import UiOffline from '../ui/offline-banner';

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
  const navigation = useNavigation();
  const { isLogin } = useAppSelector((state) => state.apps);

  useEffect(() => {
    if (!isLogin) {
      navigation.navigate('login');
    }
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
