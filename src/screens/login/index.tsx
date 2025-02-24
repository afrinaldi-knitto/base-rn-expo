import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import DeviceInfo from "react-native-device-info";
import { useLoginMutation } from "@/src/redux/api/login-api";
import ProgressButton from "./components/progress-button";
import FormTextInput from "./components/form-text-input";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks/app-hook";
import {
  resetAuth,
  setPassword,
  setUsername,
} from "@/src/redux/slice/login-slice";
import { showToast } from "@/src/lib/utils/toast";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigation } from "@/src/types/navigation";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const currentVersion = DeviceInfo.getVersion();
  const { username, password } = useAppSelector((state) => state.login);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (username === "" || password === "") {
      showToast("username & password can't empty");
      return;
    }

    try {
      const response = await login({
        title: username,
        body: password,
      }).unwrap();
      console.log("Login Successful:", response);
      dispatch(resetAuth());
      navigateToMain();
    } catch (err) {
      console.error("Login Failed:", err);
      showToast(`${JSON.stringify(err)}`);
    }
  };

  const navigateToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require("@/src/assets/dummy/bg.jpg")}
      />

      <Image
        source={require("@/src/assets/logo/logo.svg")}
        style={{ marginBottom: 20, width: 100, height: 100 }}
      />

      <FormTextInput
        onChange={(text) => dispatch(setPassword(text))}
        placeholder="Username"
        value={password}
        iconSource={require("@/src/assets/icon/email.png")}
        returnKeyType="next"
        autoFocus
      />

      <FormTextInput
        onChange={(text) => dispatch(setUsername(text))}
        placeholder="Password"
        value={username}
        iconSource={require("@/src/assets/icon/key.png")}
        returnKeyType="next"
        secureTextEntry
      />

      <TouchableOpacity style={styles.btnForgotPassword} onPress={() => {}}>
        <Text style={styles.btnText}>Forgot Password?</Text>
      </TouchableOpacity>

      <ProgressButton
        isLoading={isLoading}
        onPress={handleLogin}
        text="Login"
      />

      <Text>
        Version : {currentVersion} - {process.env.EXPO_PUBLIC_NAME}
      </Text>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  btnForgotPassword: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
