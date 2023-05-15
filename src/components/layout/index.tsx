import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { useIsConnected } from 'react-native-offline';
import theme from '../../config';
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
