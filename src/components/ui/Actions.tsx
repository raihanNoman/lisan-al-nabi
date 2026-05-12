import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../../redux/hooks";
import { useTheme } from "@/hooks/use-theme";
import { Icon } from "../themed";

// Project Imports

export default function Actions() {
  const { completedIDs, inReviewIDs, current } = useAppSelector((s) => s.quote);
  const { isCompleted, isInReview } = useMemo(
    () => ({
      isCompleted:
        current.quote?.ref && completedIDs?.includes(current.quote?.ref),
      isInReview:
        current.quote?.ref && inReviewIDs?.includes(current.quote?.ref),
    }),
    [completedIDs, inReviewIDs, current.quote?.ref],
  );
  const router = useRouter();

  const actions = {
    practice: {
      speaking: () => router.push({ pathname: "/" }),
      writing: () =>
        router.push({ pathname: "/", params: { type: "writing" } }),
    },
    mark: {
      needReview: () => router.push({ pathname: "/" }),
      completed: () => router.push({ pathname: "/" }),
    },
  };
  const activeHeart = "#FF3B30";
  const activeBookmark = "#FFCC00";

  // Theme-aware colors
  const iconColor = useTheme().text;
  const bgSubtle = useTheme().backgroundSelected;

  return (
    <SafeAreaView id="per-bite-controls" style={[styles.pos, styles.box]}>
      <ActionButton onPress={actions.practice.speaking} bg={bgSubtle}>
        <MaterialIcons name="record-voice-over" />
      </ActionButton>

      <ActionButton onPress={actions.practice.writing} bg={bgSubtle}>
        <MaterialCommunityIcons name="draw" />
      </ActionButton>

      <ActionButton onPress={actions.mark.needReview} bg={bgSubtle}>
        <MaterialCommunityIcons name="bookmark" />
      </ActionButton>

      <ActionButton onPress={actions.mark.completed} bg={bgSubtle}>
        <MaterialCommunityIcons name="check-bold" />
      </ActionButton>
    </SafeAreaView>
  );
}

interface ActionButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  active?: boolean;
  activeColor?: string;
  bg: string;
}

function ActionButton({
  children,
  onPress,
  active,
  activeColor,
  bg,
}: ActionButtonProps) {
  // Define the animation state separately if you want to memoize it,
  // or just pass it directly to the prop.

  return (
    <Pressable onPress={onPress} style={styles.btn}>
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
