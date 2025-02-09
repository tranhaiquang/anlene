import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import TestScreen from './screens/TestScreen';
import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 1 }} />
        <Stack.Screen name="Test" component={TestScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 2 }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

