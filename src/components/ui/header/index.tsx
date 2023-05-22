import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { persistor } from '@store/configure-store';
import { setLoginStatus } from '@store/features/app-slice';
import { useAppDispatch } from '@store/hooks';
import { Platform, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

const UiHeader = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const statusBarHeight = StatusBar?.currentHeight;

  const Logout = async () => {
    dispatch(setLoginStatus(false));
    await AsyncStorage.setItem('access_token', '');
    persistor.purge();
    navigation.navigate('login');
  };
  return (
    <Appbar
      style={{
        backgroundColor: theme.colors.primary,
        height: 40,
        marginTop: Platform.OS === 'android' ? statusBarHeight : 0,
      }}
    >
      <Appbar.Action
        size={20}
        color="white"
        icon="menu"
        onPress={() => navigation.toggleDrawer()}
      />
      <Appbar.Content
        style={{ margin: 0 }}
        color="white"
        title="Kolaygelsin"
        titleStyle={{ fontSize: 18 }}
      />
      <Appbar.Action
        style={{ margin: 0 }}
        icon="barcode-scan"
        size={20}
        color="white"
        onPress={() => navigation.navigate('barcode')}
      />
      <Appbar.Action
        icon="map-marker"
        size={20}
        color="white"
        onPress={() => navigation.navigate('mapping')}
      />
      <Appbar.Action icon="logout" size={20} color="white" onPress={async () => Logout()} />
    </Appbar>
  );
};

export default UiHeader;
