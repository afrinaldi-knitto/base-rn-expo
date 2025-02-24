import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Heart, House, User } from "lucide-react-native";
import HomeScreen from "@/src/screens/bottom-bar/home";
import FavoritesScreen from "@/src/screens/bottom-bar/favorites";
import ProfileScreen from "@/src/screens/bottom-bar/profile";

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <House color={color} size={size} />
);

const FavoritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Heart color={color} size={size} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <User color={color} size={size} />
);

const BottomTabNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{ animation: "shift", headerShown: false }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: FavoritesIcon,
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigator;
