import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch } from '@store/hooks';
import Constants from 'expo-constants';
import { memo, useCallback } from 'react';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';

const UiHeader = ({ hasBack = false }) => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const statusBarHeight = Constants.statusBarHeight;

  const onLogout = useCallback(async () => {
    dispatch(setLoginStatus(false));
    await AsyncStorage.setItem('access_token', '');
    persistor.purge();
    navigation.navigate('login');
  }, []);

  return (
    <Appbar
      style={{
        backgroundColor: theme.colors.primary,
        height: 44,
        marginTop: Platform.OS === 'ios' ? 0 : statusBarHeight,
      }}
    >
      {!hasBack && (
        <Appbar.Action
          size={20}
          style={{ backgroundColor: 'transparent' }}
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
      {/* <Appbar.Action
        icon="map-marker"
        size={20}
        color="white"
        onPress={() => navigation.navigate('mapping')}
      />
      <Appbar.Action icon="logout" size={20} color="white" onPress={async () => onLogout()} /> */}
    </Appbar>
  );
};

export default memo(UiHeader);
