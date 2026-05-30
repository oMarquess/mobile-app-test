import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { colors } from "@/theme";
import type { PhraseItem, VocabularyItem } from "@/types/learning";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();

  const [micActive, setMicActive] = useState(true);
  const [subtitlesVisible, setSubtitlesVisible] = useState(true);
  const [speakerPlaying, setSpeakerPlaying] = useState(false);

  const lesson = id ? getLessonById(id) : undefined;
  const language = lesson ? getLanguageById(lesson.languageId) : undefined;

  const firstActivity = lesson?.activities[0];
  const displayPhrase: string = (() => {
    if (!firstActivity) return "Hello! Let's start your lesson.";
    if (firstActivity.vocabulary && firstActivity.vocabulary.length > 0) {
      const item: VocabularyItem = firstActivity.vocabulary[0];
      return item.word;
    }
    if (firstActivity.phrases && firstActivity.phrases.length > 0) {
      const item: PhraseItem = firstActivity.phrases[0];
      return item.phrase;
    }
    return "Hello! Let's start your lesson.";
  })();

  const displayTranslation: string = (() => {
    if (!firstActivity) return "Let's begin! 👋";
    if (firstActivity.vocabulary && firstActivity.vocabulary.length > 0) {
      const item: VocabularyItem = firstActivity.vocabulary[0];
      return `${item.translation} ${item.pronunciation ? `· ${item.pronunciation}` : ""}`;
    }
    if (firstActivity.phrases && firstActivity.phrases.length > 0) {
      const item: PhraseItem = firstActivity.phrases[0];
      return item.translation;
    }
    return "Let's begin! 👋";
  })();

  useEffect(() => {
    if (lesson) {
      posthog.capture("lesson_started", {
        lessonId: lesson.id,
        title: lesson.title,
        languageId: lesson.languageId,
      });
    }
  }, [lesson?.id]);

  function handleEndCall() {
    if (lesson) {
      posthog.capture("lesson_ended", {
        lessonId: lesson.id,
        title: lesson.title,
      });
    }
    router.back();
  }

  const feedbackData = [
    { label: "Speaking", value: "Excellent", color: "#22C55E" },
    { label: "Pronunciation", value: "Great", color: colors.linguaPurple },
    { label: "Grammar", value: "Good", color: colors.linguaBlue },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0A1A" }} edges={["top"]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
          </Pressable>
          <View>
            <Text className="font-poppins-bold text-[18px] text-white">
              AI Teacher
            </Text>
            <View className="flex-row items-center gap-1.5">
              <View className="h-2 w-2 rounded-full bg-[#22C55E]" />
              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Poppins-Regular", fontSize: 12 }}>
                Online
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Ionicons name="videocam-off-outline" size={18} color="rgba(255,255,255,0.4)" />
          </View>
          <View className="flex-row items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
            <Ionicons name="star" size={13} color="#FFB800" />
            <Text style={{ color: "#FFFFFF", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>
              12
            </Text>
          </View>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Ionicons name="notifications-outline" size={18} color="rgba(255,255,255,0.7)" />
          </View>
        </View>
      </View>

      {/* ── Hero (flex fills remaining space above white section) ── */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: "https://picsum.photos/seed/living-room/600/800" }}
          style={styles.heroBg}
          contentFit="cover"
          blurRadius={1}
        />
        <View style={styles.heroOverlay} />

        {/* User camera placeholder — top right */}
        <View style={styles.userCamera}>
          <Image
            source={images.mascotAuth}
            style={styles.userCameraImage}
            contentFit="cover"
          />
          <View style={styles.userCameraLabel}>
            <Text style={{ color: "#FFFFFF", fontFamily: "Poppins-Medium", fontSize: 10 }}>
              You
            </Text>
          </View>
        </View>

        {/* Fox mascot — centered, sits above speech bubble */}
        <View style={styles.mascotWrapper}>
          <Image
            source={images.mascotWelcome}
            style={styles.mascot}
            contentFit="contain"
          />
        </View>

        {/* Speech bubble — raised above frosted controls, with tail */}
        {subtitlesVisible && (
          <View style={styles.speechBubbleWrapper}>
            <View style={styles.speechBubble}>
              <View style={{ flex: 1 }}>
                <Text style={styles.speechPhrase}>{displayPhrase}</Text>
                <Text style={styles.speechTranslation}>{displayTranslation}</Text>
              </View>
              <Pressable
                onPress={() => setSpeakerPlaying((v) => !v)}
                hitSlop={8}
                style={{ marginLeft: 10, alignSelf: "center" }}
              >
                <Ionicons
                  name={speakerPlaying ? "volume-high" : "volume-medium"}
                  size={22}
                  color={colors.linguaPurple}
                />
              </Pressable>
            </View>
            {/* Chat bubble tail */}
            <View style={styles.speechBubbleTail} />
          </View>
        )}

        {/* Frosted controls overlay — pinned to hero bottom */}
        <View style={styles.frostedControls}>
          <View style={styles.controlsRow}>
            <ControlButton icon="videocam-off" label="Camera" disabled />
            <ControlButton
              icon={micActive ? "mic" : "mic-off"}
              label="Mic"
              active={micActive}
              onPress={() => setMicActive((v) => !v)}
            />
            <ControlButton
              icon="text"
              label="Subtitles"
              active={subtitlesVisible}
              onPress={() => setSubtitlesVisible((v) => !v)}
            />
            <ControlButton
              icon="call"
              label="End Call"
              isEndCall
              onPress={handleEndCall}
            />
          </View>
        </View>
      </View>

      {/* ── White bottom section ── */}
      <View style={styles.whiteSection}>
        {lesson && (
          <View style={styles.languagePill}>
            <Text style={styles.languagePillText}>
              {language?.name ?? "Language"} · {lesson.title}
            </Text>
          </View>
        )}
        <View style={styles.feedbackCard}>
          {feedbackData.map((item, idx) => (
            <View
              key={item.label}
              style={[styles.feedbackColumn, idx < feedbackData.length - 1 && styles.feedbackDivider]}
            >
              <Text style={styles.feedbackLabel}>{item.label}</Text>
              <Text style={[styles.feedbackValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Static bottom tab bar ── */}
      <StaticTabBar />
    </SafeAreaView>
  );
}

type ControlButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  disabled?: boolean;
  active?: boolean;
  isEndCall?: boolean;
  onPress?: () => void;
};

function ControlButton({ icon, label, disabled, active, isEndCall, onPress }: ControlButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.controlButton, { opacity: disabled ? 0.35 : 1 }]}
    >
      <View
        style={[
          styles.controlCircle,
          isEndCall && styles.controlCircleEndCall,
          !isEndCall && active === false && styles.controlCircleInactive,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={isEndCall ? "#FFFFFF" : colors.textPrimary}
        />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
    </Pressable>
  );
}

const TAB_ITEMS = [
  { name: "index", label: "Home", icon: "home" as const, iconOutline: "home-outline" as const, route: "/" },
  { name: "learn", label: "Learn", icon: "book" as const, iconOutline: "book-outline" as const, route: "/learn" },
  { name: "ai-teacher", label: "AI Teacher", icon: "videocam" as const, iconOutline: "videocam-outline" as const, route: "/ai-teacher" },
  { name: "chat", label: "Chat", icon: "chatbubble" as const, iconOutline: "chatbubble-outline" as const, route: "/chat" },
  { name: "profile", label: "Profile", icon: "person" as const, iconOutline: "person-outline" as const, route: "/profile" },
];

function StaticTabBar() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: insets.bottom },
      ]}
    >
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.name === "learn";
        const color = isActive ? "#6C4EF5" : "#6B7280";
        const iconName = isActive ? tab.icon : tab.iconOutline;
        return (
          <Pressable
            key={tab.name}
            onPress={() => router.replace(tab.route as never)}
            style={styles.tabItem}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  heroContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  heroBg: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 5, 30, 0.3)",
  },
  userCamera: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 82,
    height: 82,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
  },
  userCameraImage: {
    width: "100%",
    height: "100%",
  },
  userCameraLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingVertical: 2,
    alignItems: "center",
  },
  mascotWrapper: {
    position: "absolute",
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  mascot: {
    width: 240,
    height: 240,
  },
  speechBubbleWrapper: {
    position: "absolute",
    bottom: 126,
    left: 20,
    right: 20,
  },
  speechBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",
    marginLeft: 28,
    marginTop: -1,
  },
  speechPhrase: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 17,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  speechTranslation: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  frostedControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(8, 4, 28, 0.62)",
    paddingTop: 18,
    paddingBottom: 18,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  controlButton: {
    alignItems: "center",
    gap: 6,
  },
  controlCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  controlCircleEndCall: {
    backgroundColor: "#EF4444",
  },
  controlCircleInactive: {
    backgroundColor: "rgba(200,200,210,0.75)",
  },
  controlLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  whiteSection: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  languagePill: {
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  languagePillText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: colors.textSecondary,
  },
  feedbackCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  feedbackColumn: {
    flex: 1,
    alignItems: "center",
  },
  feedbackDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  feedbackLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: colors.textSecondary,
  },
  feedbackValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    marginTop: 2,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    gap: 3,
  },
  tabLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
  },
});
