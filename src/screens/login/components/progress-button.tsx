import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface IProgressButton {
  isLoading: boolean;
  onPress: (...event: any[]) => void;
  text: string;
}

const ProgressButton = ({ isLoading, text, onPress }: IProgressButton) => (
  <TouchableOpacity
    style={[styles.buttonContainer, styles.loginButton]}
    onPress={onPress}
    disabled={isLoading}
  >
    <Text style={styles.loginText}>{text}</Text>
    {isLoading && (
      <ActivityIndicator
        size={"small"}
        color={"white"}
        animating={true}
        style={{ marginLeft: 8 }}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
});

export default ProgressButton;
