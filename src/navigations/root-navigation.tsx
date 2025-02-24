import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/src/screens/login";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./bottom-navigation";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Main" component={BottomTabNavigator} />
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
