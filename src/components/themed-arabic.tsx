import { QuranScript } from "@/assets/fonts/types";
import TAG_COLOR from "@/constants/corpus/tag-color";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
} from "react-native";
// import Animated from "react-native-reanimated";
import { IconProps } from "../../types/styles";

interface ArabicScriptStyle extends Partial<IconProps> {
  script?: keyof typeof QuranScript;
  tag?: Tag;
}
type ArabicTextProps = TextProps & ArabicScriptStyle;

function Arabic({
  style,
  script = "KFG",
  size,
  color,
  tag,
  ...otherProps
}: ArabicTextProps) {
  const arabicStyle = useArabic({ size, color, tag, script });

  return <Text style={[styles.default, arabicStyle, style]} {...otherProps} />;
}
// Arabic.Animated = ({
//   style,
//   script = "KFG",
//   size,
//   color,
//   tag,
//   ...otherProps
// }: ArabicAnimatedText) => {
//   const arabicStyle = useArabic({ size, color, tag, script });

//   return (
//     <Animated.Text
//       style={[styles.default, arabicStyle, style]}
//       {...otherProps}
//     />
//   );
// };

export default Arabic;

export function useArabic({
  size,
  color,
  tag,
  script,
}: ArabicScriptStyle): StyleProp<TextStyle> {
  // const arabic = useAppSelector((s) => s.settings.arabic);
  const defaultColor = useTheme().text;

  return {
    fontSize: size, //|| arabic.size,
    fontFamily: QuranScript[script || "KFG"], //QuranScript[script || arabic.font],
    color: color ?? (tag ? TAG_COLOR[tag] : defaultColor),
    writingDirection: "rtl",
  };
}

const styles = StyleSheet.create({
  default: {
    fontFamily: QuranScript.KFG,
    textAlign: "right",
    paddingHorizontal: 2, // some words have extra bits cut off from the sides
  },
});

Arabic.styles = styles.default;
export type { ArabicTextProps };
