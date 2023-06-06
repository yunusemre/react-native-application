import theme from '@config/index';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { memo } from 'react';
import { Appbar } from 'react-native-paper';

const UiHeader = ({ hasBack = false }) => {
  const navigation: any = useNavigation();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <Appbar
      style={{
        backgroundColor: theme.colors.primary,
        height: 44,
        marginTop: statusBarHeight,
      }}
    >
      {!hasBack && (
        <Appbar.Action
          size={20}
          color="white"
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      )}
      {hasBack && <Appbar.BackAction size={20} color="white" onPress={() => navigation.goBack()} />}
      <Appbar.Content
        style={{ margin: 0 }}
        color="white"
        title="Kolaygelsin"
        titleStyle={{ fontSize: 18 }}
      />
      <Appbar.Action
        style={{ margin: 0 }}
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
