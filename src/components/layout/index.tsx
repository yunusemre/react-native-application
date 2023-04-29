import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { View } from 'react-native';
import AppColors from '../../config/colors';
import Box from '../ui/box';
import UiHeader from '../ui/header';

const Layout = ({
  style,
  isHeader = false,
  openBarcode,
  backgroundColor = AppColors.primary,
  children,
}: {
  isHeader?: boolean;
  backgroundColor?: any;
  style?: any;
  children: ReactNode;
  openBarcode?: any;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={backgroundColor} />
      {isHeader && <UiHeader openBarcode={openBarcode} />}
      <Box>{children}</Box>
    </View>
  );
};

export default Layout;
