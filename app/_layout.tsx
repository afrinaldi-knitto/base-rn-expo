import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { ErrorBoundaryProps, Stack } from "expo-router";
import DataWedgeIntents from "react-native-datawedge-intents";
import { View, Text } from "react-native";

DataWedgeIntents.registerBroadcastReceiver({
  filterActions: [
    "com.zebra.dwintents.ACTION",
    "com.symbol.datawedge.api.RESULT_ACTION",
  ],
  filterCategories: ["android.intent.category.DEFAULT"],
});

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
