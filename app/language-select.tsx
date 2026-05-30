import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { Language } from "@/types/learning";

const LEARNER_COUNTS: Record<string, string> = {
  es: "28.4M learners",
  fr: "19.4M learners",
  ja: "12.7M learners",
  de: "8.1M learners",
  zh: "7.4M learners",
};

export default function LanguageSelectScreen() {
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  const posthog = usePostHog();
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<string | null>(
    selectedLanguageId
  );

  const filtered = useMemo(
    () =>
      languages.filter((lang) =>
        lang.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  function handleConfirm() {
    if (!localSelected) return;
    const language = languages.find((l) => l.id === localSelected);
    posthog.capture("language_selected", {
      language_id: localSelected,
      language_name: language?.name ?? localSelected,
      is_first_selection: !selectedLanguageId,
    });
    setSelectedLanguageId(localSelected);
    router.back();
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "left", "right"]}
    >
      <View className="flex-row items-center px-5 pb-2 pt-3">
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={28} color="#0D132B" />
        </Pressable>
        <Text className="flex-1 text-center font-poppins-bold text-[20px] text-text-primary">
          Choose a language
        </Text>
        <View className="w-7" />
      </View>

      <View className="mx-5 mb-5 mt-3 flex-row items-center gap-3 rounded-full bg-surface px-4 py-[13px]">
        <Ionicons name="search" size={18} color="#6B7280" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search languages"
          placeholderTextColor="#6B7280"
          style={{
            flex: 1,
            padding: 0,
            fontFamily: "Poppins-Regular",
            fontSize: 15,
            color: "#0D132B",
          }}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 font-poppins-bold text-[17px] text-text-primary">
          Popular
        </Text>

        <View className="gap-3">
          {filtered.map((lang) => (
            <LanguageCard
              key={lang.id}
              lang={lang}
              isSelected={localSelected === lang.id}
              onPress={() => setLocalSelected(lang.id)}
            />
          ))}

          {filtered.length === 0 && (
            <Text className="mt-6 text-center font-poppins-regular text-[15px] text-text-secondary">
              No languages found
            </Text>
          )}
        </View>
      </ScrollView>

      <View className="px-5 pb-3 pt-2">
        <Pressable
          onPress={handleConfirm}
          disabled={!localSelected}
          className={
            localSelected
              ? "h-[62px] items-center justify-center rounded-[16px] bg-lingua-purple"
              : "h-[62px] items-center justify-center rounded-[16px] bg-border"
          }
        >
          <Text className="font-poppins-semibold text-[18px] text-white">
            Confirm Language
          </Text>
        </Pressable>
      </View>

      <View className="h-[160px] overflow-hidden">
        <Image
          source={images.earth}
          style={{ width: "100%", height: 220 }}
          contentFit="cover"
          contentPosition="top"
        />
      </View>
    </SafeAreaView>
  );
}

type LanguageCardProps = {
  lang: Language;
  isSelected: boolean;
  onPress: () => void;
};

function LanguageCard({ lang, isSelected, onPress }: LanguageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={
        isSelected
          ? "flex-row items-center rounded-[16px] border-2 border-lingua-purple bg-[#EEEAFF] px-4 py-3"
          : "flex-row items-center rounded-[16px] border border-border bg-white px-4 py-3"
      }
    >
      <Image
        source={{ uri: lang.flagUrl }}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        contentFit="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-[16px] text-text-primary">
          {lang.name}
        </Text>
        <Text className="font-poppins-regular text-[13px] text-text-secondary">
          {LEARNER_COUNTS[lang.id] ?? ""}
        </Text>
      </View>
      {isSelected ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </Pressable>
  );
}
