import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLessonsByUnit } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import type { Lesson } from "@/types/learning";

type LessonStatus = "completed" | "in-progress" | "not-started";

const LESSON_EMOJIS: Record<string, string> = {
  "Daily Life": "🏡",
  "At the Café": "☕",
  "Travel & Directions": "🗺️",
  Shopping: "🛍️",
  Greetings: "👋",
  Introductions: "🙋",
  "Numbers 1–10": "🔢",
  Colors: "🎨",
};

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");
  const posthog = usePostHog();

  const { selectedLanguageId } = useLanguageStore();
  const { completedLessonIds, inProgressLessonId } = useProgressStore();

  const units = selectedLanguageId ? getUnitsByLanguage(selectedLanguageId) : [];
  const unit = units[0];
  const lessons = unit ? getLessonsByUnit(unit.id) : [];

  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;

  function getLessonStatus(lesson: Lesson): LessonStatus {
    if (completedLessonIds.includes(lesson.id)) return "completed";
    if (lesson.id === inProgressLessonId) return "in-progress";
    return "not-started";
  }

  function handleLessonPress(lesson: Lesson) {
    posthog.capture("lesson_tapped", { lessonId: lesson.id, title: lesson.title });
    router.push(`/lesson/${lesson.id}`);
  }

  const heroImageUrl = `https://picsum.photos/seed/${unit?.id ?? "lesson"}/600/300`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero image ── */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: heroImageUrl }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Header row on top of hero */}
          <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-5 pt-4">
            <View className="flex-1">
              <Text className="font-poppins-bold text-[22px] text-white">
                {unit?.title ?? "Basics 1"}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Poppins-Regular", fontSize: 13 }}>
                Unit 1 • {completedCount} / {lessons.length} lessons
              </Text>
            </View>
            <View className="h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="bookmark-outline" size={18} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* ── Tab toggle ── */}
        <View className="mx-5 mt-4 flex-row rounded-[14px] bg-surface p-1">
          <Pressable
            onPress={() => setActiveTab("lessons")}
            className="flex-1 items-center rounded-[11px] py-2"
            style={activeTab === "lessons" ? styles.activeTab : undefined}
          >
            <Text
              className="font-poppins-semibold text-[15px]"
              style={{ color: activeTab === "lessons" ? "#6C4EF5" : "#6B7280" }}
            >
              Lessons
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("practice")}
            className="flex-1 items-center rounded-[11px] py-2"
            style={activeTab === "practice" ? styles.activeTab : undefined}
          >
            <Text
              className="font-poppins-semibold text-[15px]"
              style={{ color: activeTab === "practice" ? "#6C4EF5" : "#6B7280" }}
            >
              Practice
            </Text>
          </Pressable>
        </View>

        {/* ── Content ── */}
        {activeTab === "lessons" ? (
          <View className="mt-4 px-5 pb-28 gap-3">
            {lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson);
              const emoji = LESSON_EMOJIS[lesson.title];
              const activityCount = lesson.activities.length;

              const isInProgress = status === "in-progress";
              const isCompleted = status === "completed";

              return (
                <Pressable
                  key={lesson.id}
                  onPress={() => handleLessonPress(lesson)}
                  style={[styles.lessonCard, isInProgress && styles.lessonCardActive]}
                >
                  <View className="flex-1">
                    <Text
                      className="font-poppins-medium text-[12px]"
                      style={{ color: isInProgress ? "#6C4EF5" : "#9CA3AF" }}
                    >
                      Lesson {index + 1}
                    </Text>
                    <Text className="mt-0.5 font-poppins-bold text-[16px] text-text-primary">
                      {lesson.title}
                    </Text>
                    {isInProgress && (
                      <Text className="mt-0.5 font-poppins-medium text-[13px] text-lingua-purple">
                        In progress
                      </Text>
                    )}
                    {!isCompleted && !isInProgress && (
                      <Text className="mt-0.5 font-poppins-regular text-[12px] text-text-secondary">
                        0 / {activityCount} activities
                      </Text>
                    )}
                  </View>

                  {isCompleted && (
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-[#22C55E]">
                      <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    </View>
                  )}
                  {isInProgress && emoji && (
                    <Text style={{ fontSize: 28 }}>{emoji}</Text>
                  )}
                  {!isCompleted && !isInProgress && (
                    <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                  )}
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View className="mt-10 items-center px-5 pb-28">
            <Text className="font-poppins-semibold text-[18px] text-text-primary">
              Practice mode
            </Text>
            <Text className="mt-2 text-center font-poppins-regular text-[14px] text-text-secondary">
              Coming soon — finish your lessons first!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 220,
    position: "relative",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20, 10, 60, 0.45)",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
  },
  lessonCardActive: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FAFAFF",
  },
});
