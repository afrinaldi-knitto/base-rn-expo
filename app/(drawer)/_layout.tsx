import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(bottom-bar)"
          options={{
            drawerLabel: "Home",
            title: "Main Screen",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings Screen",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
