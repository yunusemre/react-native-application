import { Box } from '@components/ui';
import theme from '@config/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation: any = useNavigation();
  const routes: any = useRoute();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-around"
      style={{ position: 'absolute', bottom: 0, left: 0 }}
      width={'100%'}
      height={50}
      bg="white"
      borderTopWidth={1}
      borderTopColor="borderColor"
      borderBottomWidth={1}
      borderBottomColor="borderColor"
    >
      <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('mapping')}>
        <Icon
          size={24}
          name="map-marker"
          style={{
            color: routes.name === 'mapping' ? theme.colors.primary : 'black',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('barcode')}>
        <Icon size={24} name="square-edit-outline" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.center]} onPress={() => navigation.navigate('barcode')}>
        <Icon size={36} name="barcode-scan" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('mapping')}>
        <Icon size={24} name="playlist-star" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('issues')}>
        <Icon
          size={24}
          name="format-list-bulleted"
          style={{ color: routes.name === 'home' ? theme.colors.primary : 'black' }}
        />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  centerButton: {},
});

export default BottomTab;

{
  /* <Drawer.Screen
            name="barcode"
            component={BarcodeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="mapping"
            component={MappingScreen}
            options={{
              unmountOnBlur: true,
              headerShown: false,
            }}
          /> */
}
