import BarcodeScreen from '@pages/barcode-reader';
import HomeScreen from '@pages/home';
import HomeDetails from '@pages/home/details.tsx';
import MappingScreen from '@pages/map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="detail" component={HomeDetails} />
      <Stack.Screen name="barcode" component={BarcodeScreen} />
      <Stack.Screen name="mapping" component={MappingScreen} />
    </Stack.Navigator>
  );
};

export default StackRouter;
