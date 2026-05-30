import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
};

const tabs: TabConfig[] = [
  { name: "index", label: "Home", icon: "home", iconOutline: "home-outline" },
  { name: "learn", label: "Learn", icon: "book", iconOutline: "book-outline" },
  {
    name: "ai-teacher",
    label: "AI Teacher",
    icon: "videocam",
    iconOutline: "videocam-outline",
  },
  {
    name: "chat",
    label: "Chat",
    icon: "chatbubble",
    iconOutline: "chatbubble-outline",
  },
  {
    name: "profile",
    label: "Profile",
    icon: "person",
    iconOutline: "person-outline",
  },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  function handlePress(index: number) {
    const route = state.routes[index];
    navigation.navigate(route.name);
  }

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
      }}
      className="flex-row items-center justify-around pt-2"
    >
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        const iconName = isFocused ? tab.icon : tab.iconOutline;
        const color = isFocused ? "#6C4EF5" : "#6B7280";

        return (
          <Pressable
            key={tab.name}
            onPress={() => handlePress(index)}
            className="items-center justify-center py-2"
            style={{ flex: 1 }}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text
              className="mt-1 font-poppins-medium text-[11px]"
              style={{ color }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
