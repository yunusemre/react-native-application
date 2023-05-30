import HomeScreen from '@pages/home';
import HomeDetails from '@pages/home/details.tsx';
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
    </Stack.Navigator>
  );
};

export default StackRouter;
