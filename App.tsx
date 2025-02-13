import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./navigation/types";
import WelcomeScreen from './screens/WelcomeScreen';
import TestScreen from './screens/TestScreen';
import SubmitScreen from './screens/SubmitScreen'
import PromoScreen from "./screens/PromoScreen";

// Create the stack navigator with the correct type
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PromoScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 1 }} />
        <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 2 }} />
        <Stack.Screen name="SubmitScreen" component={SubmitScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 3, theme: "gray" }} />
        <Stack.Screen name="PromoScreen" component={PromoScreen} options={{ headerShown: false }} initialParams={{ pageNumber: 4, theme: "gray" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}