import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../../redux/hooks";
import { useTheme } from "@/hooks/use-theme";
import { Icon, Text, View } from "../Themed";
import { useStateLooper } from "@/hooks/use-state-looper";
import { LANGUAGE_INFO, Languages } from "../../../utils/languages";

// Project Imports

export default function Actions() {
  const theme = useTheme();
  const router = useRouter();

  const navPractice = () =>
    router.push({ pathname: "/practice/(session)/ordering" });
  const openModal = {
    practiceOptions: () => router.push({ pathname: "/options/prectice" }),
    languageOptions: () => router.push({ pathname: "/options/translation" }),
    moreOptions: () => router.push({ pathname: "/options/utility" }),
  };
  const activeHeart = "#FF3B30";
  const activeBookmark = "#FFCC00";

  // Theme-aware colors
  const iconColor = useTheme().text;
  const bgSubtle = useTheme().backgroundSelected;

  const volume = useStateLooper([true, false]);
  const language = useStateLooper<Language | undefined>([
    undefined,
    ...Languages,
  ]);

  function LanguageLooper() {
    if (language.currentOption) {
      const flag = LANGUAGE_INFO[language.currentOption].flag;
      return <Text style={{ fontSize: size }}>{flag}</Text>;
    } else {
      return <Ionicons name="language" size={size} color={theme.text} />;
    }
  }

  return (
    <SafeAreaView id="per-bite-controls" style={[styles.pos, styles.box]}>
      <ActionButton onPress={volume.trigger.next} bg={bgSubtle}>
        <MaterialCommunityIcons
          name={volume.currentOption ? "volume-mute" : "volume-high"}
        />
      </ActionButton>
      <View style={{ flex: 1, minHeight: 100 }} />

      <ActionButton
        onPress={navPractice}
        onLongPress={openModal.practiceOptions}
        bg={bgSubtle}
      >
        <MaterialCommunityIcons name="sword-cross" />
      </ActionButton>

      <ActionButton
        onPress={language.trigger.next}
        onLongPress={openModal.languageOptions}
        bg={bgSubtle}
      >
        <LanguageLooper />
      </ActionButton>

      <ActionButton
        onPress={openModal.moreOptions}
        onLongPress={openModal.moreOptions}
        bg={bgSubtle}
      >
        <MaterialCommunityIcons name="dots-vertical" />
      </ActionButton>
    </SafeAreaView>
  );
}

interface ActionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  active?: boolean;
  activeColor?: string;
  bg: string;
}

function ActionButton({
  children,
  onPress,
  onLongPress,
  active,
  activeColor,
  bg,
}: ActionButtonProps) {
  // Define the animation state separately if you want to memoize it,
  // or just pass it directly to the prop.

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.btn}>
      <Icon size={size}>{children}</Icon>
    </Pressable>
  );
}

const size = 30;

const styles = StyleSheet.create({
  pos: {
    position: "absolute",
    right: 12,
    bottom: "12%",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  btn: {
    backgroundColor: "#8885",

    alignItems: "center",
    justifyContent: "center",

    width: 54,
    height: 54,
    borderRadius: 27,

    // Ensure shadow is visible on cross-platform
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
