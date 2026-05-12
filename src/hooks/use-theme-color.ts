/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import { useTheme } from "@react-navigation/native";
import { Colors } from "@/constants/theme";

export type ThemeProps = { light?: string; dark?: string };
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName,
  overrideTheme?: "dark" | "light" | null,
) {
  const theme = overrideTheme || useTheme().dark ? "dark" : "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
