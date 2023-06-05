import BarcodeScreen from '@pages/barcode-reader';
import HomeScreen from '@pages/home';
import { HomeDetailWeights } from '@pages/home/detail-weight';
import HomeDetails from '@pages/home/details';
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
      <Stack.Screen name="home-detail" component={HomeDetails} />
      <Stack.Screen name="home-detail-weight" component={HomeDetailWeights} />
      <Stack.Screen name="barcode" component={BarcodeScreen} />
      <Stack.Screen name="mapping" component={MappingScreen} />
    </Stack.Navigator>
  );
};

export default StackRouter;
