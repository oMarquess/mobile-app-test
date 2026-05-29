import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-10 pb-8 pt-5">
        <View className="items-center">
          <View className="flex-row items-center gap-3">
            <Image
              source={images.mascotLogo}
              contentFit="contain"
              className="h-14 w-14"
            />
            <Text className="font-poppins-bold text-[34px] leading-[42px] text-text-primary">
              lingua
            </Text>
          </View>
        </View>

        <View className="mt-14">
          <Text className="font-poppins-bold text-[38px] leading-[51px] tracking-[-1.2px] text-text-primary">
            Your AI language
          </Text>
          <Text className="font-poppins-bold text-[38px] leading-[51px] tracking-[-1.2px] text-lingua-purple">
            teacher.
          </Text>
          <Text className="mt-4 font-poppins-regular text-[18px] leading-[31px] text-text-secondary">
            Real conversations, personalized{`\n`}lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="relative mt-5 flex-1 items-center justify-end">
          <View className="absolute left-1 top-2 z-10 rounded-[18px] bg-[#F0F6FF] px-5 py-4">
            <Text className="-rotate-[6deg] font-poppins-medium text-[22px] text-text-primary">
              Hello!
            </Text>
            <View className="absolute -bottom-2 left-12 h-0 w-0 border-l-[9px] border-r-[9px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#F0F6FF]" />
          </View>

          <View className="absolute right-1 top-0 z-10 rounded-[18px] bg-[#F6F4FF] px-5 py-4">
            <Text className="rotate-[8deg] font-poppins-medium text-[22px] text-lingua-deep-purple">
              ¡Hola!
            </Text>
            <View className="absolute -bottom-2 left-6 h-0 w-0 border-l-[9px] border-r-[9px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#F6F4FF]" />
          </View>

          <View className="absolute right-0 top-28 z-10 rounded-[18px] bg-[#FFF4EF] px-5 py-4">
            <Text className="rotate-[8deg] font-poppins-medium text-[22px] text-error">
              你好!
            </Text>
          </View>

          <Image
            source={images.mascotWelcome}
            contentFit="contain"
            className="h-[330px] w-[330px]"
          />
        </View>

        <Link href="/" asChild>
          <View className="mt-8 h-[78px] flex-row items-center justify-center rounded-[18px] bg-lingua-purple active:bg-lingua-deep-purple">
            <Text className="font-poppins-semibold text-[20px] text-white">
              Get Started
            </Text>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={colors.background}
              style={styles.buttonIcon}
            />
          </View>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonIcon: {
    position: "absolute",
    right: 31,
  },
});
