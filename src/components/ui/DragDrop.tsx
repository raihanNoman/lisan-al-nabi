import {
  DuoDragDropProps,
  Lines,
  Placeholder,
} from "@jamsch/react-native-duo-drag-drop";
import { memo } from "react";
import { StyleSheet } from "react-native";

import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { shadow_ } from "@/styles/styleShadow";

const RenderPlaceHolder: DuoDragDropProps["renderPlaceholder"] = memo(
  ({ style }) => {
    const card = useTheme().backgroundElement;
    return (
      <Placeholder
        style={[
          style,
          { borderRadius: 8, backgroundColor: card },
          styles.shadow,
        ]}
      />
    );
  },
);

const RenderLines: DuoDragDropProps["renderLines"] = memo((props) => {
  const card = useTheme().background;

  return (
    <Lines
      {...props}
      containerStyle={{ backgroundColor: "transparent", borderColor: "#f00" }}
      lineStyle={{ borderBottomColor: card, borderTopWidth: 0 }}
    />
  );
});

const styles = StyleSheet.create({
  shadow: shadow_({
    color: "#000",
    radius: 1,
    opacity: 0.2,
    offset: { height: 2, width: 2 },
  }),
  word: {
    marginTop: -0,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});
export const arabicWordStyle = styles.word;
export { RenderPlaceHolder, RenderLines };
