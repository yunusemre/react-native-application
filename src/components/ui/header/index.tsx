import theme from '@config/index';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { memo } from 'react';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';

const UiHeader = ({ hasBack = false }) => {
  const navigation: any = useNavigation();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <Appbar
      style={{
        backgroundColor: theme.colors.primary,
        height: 48,
        marginTop: Platform.OS === 'ios' ? 0 : statusBarHeight,
      }}
    >
      {!hasBack && (
        <Appbar.Action
          size={20}
          style={{ margin: 0, backgroundColor: 'transparent' }}
          color="white"
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      )}
      {hasBack && (
        <Appbar.BackAction
          style={{ margin: 0, backgroundColor: 'transparent' }}
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
      )}
      <Appbar.Content
        style={{ margin: 0 }}
        color="white"
        title="Kolaygelsin"
        titleStyle={{ fontSize: 18 }}
      />
      <Appbar.Action
        style={{ margin: 0, backgroundColor: 'transparent' }}
        icon="bell"
        size={20}
        color="white"
        onPress={() => navigation.navigate('notification')}
      />
    </Appbar>
  );
};

export default memo(UiHeader);
