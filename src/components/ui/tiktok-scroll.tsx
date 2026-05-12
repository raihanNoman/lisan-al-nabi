import { SymbolView } from "expo-symbols";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { ExternalLink } from "@/components/external-link";
import { View } from "@/components/Themed";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useScrollViewStyles } from "@/styles/scroll-view";
import { SnapScrollProps } from "./tiktok-scroll-props";

export default function SnapScrollView({
  postIDs,
  onScroll,
  postHeight = 100,
}: SnapScrollProps) {
  const theme = useTheme();
  const scrollViewStyles = useScrollViewStyles({
    containerStyles: styles.contentContainer,
    styles: styles.scrollView,
  });

  const { height } = useWindowDimensions();
  return (
    <ScrollView
      {...scrollViewStyles}
      decelerationRate={"fast"}
      snapToInterval={height}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="always"
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{"\n"}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{
                    ios: "arrow.up.right.square",
                    android: "link",
                    web: "link",
                  }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <View style={{ height: height, backgroundColor: "red" }} />
        <View style={{ height: height, backgroundColor: "green" }} />

        {Platform.OS === "web" && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: "center",
    gap: Spacing.one,
    alignItems: "center",
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: "center",
  },
  imageTutorial: {
    width: "100%",
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
