import { Tabs } from "expo-router";
import { Heart, House, User } from "lucide-react-native";

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <House color={color} size={size} />
);

const FavoritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Heart color={color} size={size} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <User color={color} size={size} />
);

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: "Favorites", tabBarIcon: FavoritesIcon }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ProfileIcon }}
      />
    </Tabs>
  );
}
