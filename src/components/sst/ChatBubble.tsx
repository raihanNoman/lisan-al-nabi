import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Text } from "../Themed";

interface ChatBubbleProps {
  left?: boolean; // AI
  right?: boolean; // User
  children: ReactNode;
  style?: ViewStyle;
}

export default function ChatBubble({
  left,
  right,
  children,
  style,
}: ChatBubbleProps) {
  const brandRed = useThemeColor({ light: "#E31B23", dark: "#FF4D4D" }, "text");
  const aiGold = "#D4AF37";
  const textColor = useThemeColor({}, "text");
  const subtext = useThemeColor({ light: "#666", dark: "#aaa" }, "text");
  const borderColor = useThemeColor({ light: "#eee", dark: "#333" }, "text");

  // Custom styles for Markdown elements
  const markdownStyles = StyleSheet.create({
    body: { color: textColor, fontSize: 16, lineHeight: 24 },
    heading3: {
      color: brandRed,
      fontSize: 18,
      fontWeight: "700",
      marginTop: 12,
      marginBottom: 4,
    },
    strong: { fontWeight: "bold", color: left ? aiGold : brandRed },
    paragraph: { marginBottom: 8 },
    list_item: { marginBottom: 4 },
  });

  return (
    <View style={[styles.card, style]}>
      <View
        style={[
          styles.header,
          right && { marginLeft: "auto", flexDirection: "row-reverse" },
        ]}
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: left ? `${aiGold}20` : `${brandRed}20` },
          ]}
        >
          <Ionicons
            name={left ? "sparkles" : "person"}
            size={14}
            color={left ? aiGold : brandRed}
          />
        </View>
        <Text style={[styles.roleText, { color: subtext }]}>
          {left ? "TAZZABUR AI" : "YOU"}
        </Text>
      </View>

      <View style={styles.content}>
        {typeof children === "string" ? (
          <Markdown style={markdownStyles}>{children}</Markdown>
        ) : (
          children
        )}
      </View>
      <View style={[styles.separator, { backgroundColor: borderColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: "100%", paddingHorizontal: 16, paddingTop: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  roleText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  content: {},
  separator: { height: 1, width: "100%", marginTop: 16 },
});
