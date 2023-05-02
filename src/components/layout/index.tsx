import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import AppColors from '../../config/colors';
import Box from '../ui/box';
import UiHeader from '../ui/header';
import Offline from '../ui/offline-banner';

const Layout = ({
  isHeader = false,
  openBarcode,
  backgroundColor = AppColors.primary,
  children,
}: {
  isHeader?: boolean;
  backgroundColor?: any;
  children: ReactNode;
  openBarcode?: any;
}) => {
  const isOnline = useIsConnected();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={backgroundColor} />
      {isHeader && <UiHeader openBarcode={openBarcode} />}
      <Box>{children}</Box>
      {isOnline === null || isOnline === true ? null : <Offline />}
    </View>
  );
};

export default Layout;
