import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import theme from '../../../config';

const UiHeader = () => {
  const navigation: any = useNavigation();
  return (
    <Appbar style={{ backgroundColor: theme.colors.primary, height: 50 }}>
      <Appbar.Action color="white" icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content color="white" title="Kolaygelsin" titleStyle={{ fontSize: 18 }} />
      <Appbar.Action
        icon="barcode"
        size={30}
        color="white"
        onPress={() => navigation.navigate('barcode')}
      />
      <Appbar.Action icon="login" color="white" onPress={() => navigation.navigate('login')} />
    </Appbar>
  );
};

export default UiHeader;
