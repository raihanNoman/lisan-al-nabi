import { BottomTabInset, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Platform, ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useScrollViewStyles({
  containerStyles,
  styles,
}: {
  containerStyles?: StyleProp<ViewStyle>;
  styles?: StyleProp<ViewStyle>;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const props: ScrollViewProps = {
    style: [{ backgroundColor: theme.background }, styles],
    contentContainerStyle: [contentPlatformStyle, containerStyles],
    contentInset: insets,
  };

  return props;
}
