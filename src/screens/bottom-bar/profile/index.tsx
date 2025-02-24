import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>

      <StatusBar style="dark" />
    </View>
  );
};

export default ProfileScreen;
