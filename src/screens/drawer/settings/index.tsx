import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default SettingsScreen;
