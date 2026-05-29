import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="ds-screen justify-center gap-6">
      <View className="ds-card gap-3">
        <Text className="ds-brand-label">Design System</Text>
        <Text className="ds-h1">Lingua</Text>
        <Text className="ds-body">
          NativeWind theme tokens, typography utilities, and Poppins fonts are
          ready for the app.
        </Text>
      </View>

      <View className="flex-row gap-3">
        <View className="h-14 flex-1 rounded-[14px] bg-lingua-purple" />
        <View className="h-14 flex-1 rounded-[14px] bg-lingua-blue" />
        <View className="h-14 flex-1 rounded-[14px] bg-lingua-green" />
      </View>
    </View>
  );
}
