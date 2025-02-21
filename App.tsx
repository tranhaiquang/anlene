import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from './store';
import { RootStackParamList } from "./navigation/types";
import WelcomeScreen from './screens/WelcomeScreen';
import TestScreen from './screens/TestScreen';
import SubmitScreen from './screens/SubmitScreen';
import PromoScreen from "./screens/PromoScreen";
import VoucherScreen from "./screens/VoucherScreen";
import InfoScreen from "./screens/InfoScreen";

// Create the stack navigator 
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 1 }}
          />
          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 2 }}
          />
          <Stack.Screen
            name="SubmitScreen"
            component={SubmitScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 3, theme: "green" }}
          />
          <Stack.Screen
            name="PromoScreen"
            component={PromoScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 4, theme: "green" }}
          />
          <Stack.Screen
            name="VoucherScreen"
            component={VoucherScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 5 }}
          />
          <Stack.Screen
            name="InfoScreen"
            component={InfoScreen}
            options={{ headerShown: false }}
            initialParams={{ pageNumber: 6 }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
