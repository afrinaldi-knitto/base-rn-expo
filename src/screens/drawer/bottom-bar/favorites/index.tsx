import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

const FavoritesScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Favorites Screen</Text>

      <StatusBar style="dark" />
    </View>
  );
};

export default FavoritesScreen;
