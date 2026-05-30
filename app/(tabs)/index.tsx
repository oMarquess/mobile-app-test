import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  de: "Hallo",
  zh: "你好",
};

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();
  const { xp, dailyGoal, streak } = useProgressStore();

  const language = selectedLanguageId ? getLanguageById(selectedLanguageId) : null;
  const units = selectedLanguageId ? getUnitsByLanguage(selectedLanguageId) : [];
  const firstUnit = units[0];
  const lessons = firstUnit ? getLessonsByUnit(firstUnit.id) : [];

  const firstName = user?.firstName ?? "there";
  const greeting = selectedLanguageId ? (GREETINGS[selectedLanguageId] ?? "Hey") : "Hey";
  const progressPercent = Math.min((xp / dailyGoal) * 100, 100);

  const todayPlan = [
    {
      iconName: "book" as const,
      iconBg: "#6C4EF5",
      title: "Lesson",
      subtitle: lessons[0]?.title ?? "Greetings",
      done: true,
    },
    {
      iconName: "headset" as const,
      iconBg: "#4D8BFF",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      done: false,
    },
    {
      iconName: "chatbubble" as const,
      iconBg: "#FF6B6B",
      title: "New words",
      subtitle: `${lessons[0]?.activities[0]?.vocabulary?.length ?? 10} words`,
      done: false,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-28">
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between pb-6 pt-4">
          <View className="flex-row items-center gap-3">
            {language && (
              <Image
                source={{ uri: language.flagUrl }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
                contentFit="cover"
              />
            )}
            <Text className="font-poppins-semibold text-[18px] text-text-primary">
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                style={{ width: 22, height: 22 }}
                contentFit="contain"
              />
              <Text className="font-poppins-bold text-[16px] text-streak">
                {streak}
              </Text>
            </View>
            <Ionicons name="notifications-outline" size={24} color="#0D132B" />
          </View>
        </View>

        {/* ── Daily goal card ── */}
        <View
          className="mb-5 flex-row items-center overflow-hidden rounded-[20px] p-5"
          style={{ backgroundColor: "#FFF4E6" }}
        >
          <View className="flex-1">
            <Text className="font-poppins-medium text-[13px] text-text-secondary">
              Daily goal
            </Text>
            <View className="mt-1 flex-row items-end gap-1">
              <Text className="font-poppins-bold text-[28px] leading-[34px] text-text-primary">
                {xp}
              </Text>
              <Text className="mb-1 font-poppins-regular text-[16px] text-text-secondary">
                {" "}/ {dailyGoal} XP
              </Text>
            </View>
            <View className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-[#FFE0B2]">
              <View
                className="h-[6px] rounded-full bg-[#FF8A00]"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          </View>

          <Image
            source={images.treasure}
            style={{ width: 80, height: 80, marginLeft: 12 }}
            contentFit="contain"
          />
        </View>

        {/* ── Continue learning card ── */}
        <View
          className="mb-5 overflow-hidden rounded-[20px] p-5"
          style={{ backgroundColor: "#6C4EF5", minHeight: 148 }}
        >
          <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Poppins-Regular", fontSize: 13 }}>
            Continue learning
          </Text>
          <Text className="mt-1 font-poppins-bold text-[28px] text-white">
            {language?.name ?? "Spanish"}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Poppins-Regular", fontSize: 14 }}>
            A1 • {firstUnit?.title ?? "Unit 1"}
          </Text>

          <View className="mt-4 self-start rounded-[12px] bg-white px-5 py-2">
            <Text className="font-poppins-semibold text-[15px] text-lingua-purple">
              Continue
            </Text>
          </View>

          <Image
            source={images.palace}
            className="absolute -right-2 bottom-0 h-[130px] w-[130px]"
            contentFit="contain"
          />
        </View>

        {/* ── Today's plan ── */}
        <View className="mb-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-poppins-bold text-[18px] text-text-primary">
              Today's plan
            </Text>
            <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
              View all
            </Text>
          </View>

          <View className="gap-2">
            {todayPlan.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center gap-4 rounded-[16px] bg-surface px-4 py-3"
              >
                <View
                  className="h-11 w-11 items-center justify-center rounded-[12px]"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Ionicons name={item.iconName} size={20} color="#FFFFFF" />
                </View>

                <View className="flex-1">
                  <Text className="font-poppins-semibold text-[15px] text-text-primary">
                    {item.title}
                  </Text>
                  <Text className="font-poppins-regular text-[13px] text-text-secondary">
                    {item.subtitle}
                  </Text>
                </View>

                {item.done ? (
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View className="h-7 w-7 rounded-full border-2 border-border" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ── Next up card ── */}
        <View
          className="flex-row items-center rounded-[20px] p-5"
          style={{ backgroundColor: "#F0FDF4" }}
        >
          <View className="flex-1">
            <Text className="font-poppins-medium text-[12px] text-text-secondary">
              Next up
            </Text>
            <Text className="mt-1 font-poppins-bold text-[18px] text-text-primary">
              AI Video Call
            </Text>
            <Text className="font-poppins-regular text-[13px] text-text-secondary">
              Practice speaking
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: "https://picsum.photos/seed/teacher/200/200" }}
              style={{ width: 52, height: 52, borderRadius: 26 }}
              contentFit="cover"
            />
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#21C16B]">
              <Ionicons name="videocam" size={20} color="#FFFFFF" />
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

