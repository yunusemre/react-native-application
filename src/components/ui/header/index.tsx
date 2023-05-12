import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import theme from '../../../config';

const UiHeader = () => {
  const navigation: any = useNavigation();
  return (
    <Appbar
      style={{
        backgroundColor: theme.colors.primary,
        height: 40,
        marginTop: Platform.OS === 'android' ? 24 : 0,
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
    </Appbar>
  );
};

export default UiHeader;
