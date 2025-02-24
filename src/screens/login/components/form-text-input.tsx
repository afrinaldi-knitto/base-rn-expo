import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface IFormTextInput {
  placeholder: string;
  value: string;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  onChange: (...event: any[]) => void;
  returnKeyType?: "next" | "done" | "go" | "search" | "send";
  iconSource?: any;
}

const FormTextInput = ({
  autoFocus,
  secureTextEntry,
  onChange,
  placeholder,
  value,
  iconSource,
  returnKeyType,
}: IFormTextInput) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.inputs}
      placeholder={placeholder}
      underlineColorAndroid="transparent"
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChange}
      autoFocus={autoFocus}
      returnKeyType={returnKeyType}
    />
    <Image style={styles.inputIcon} source={iconSource} />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
});

export default FormTextInput;
