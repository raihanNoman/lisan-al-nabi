import React, { useMemo, ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

// Assuming these imports exist in your project structure
import { Icon } from "./Themed";
import { IconProps } from "../../types/styles";
import { useThemeColor } from "@/hooks/use-theme-color";

const BORDER_RADIUS = 24;
const ARROW_SIZE = 30;

type ButtonIcon = (p: IconProps, isActive: boolean) => ReactNode;

interface ButtonProps {
  title?: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  arrow?: boolean | "left";
  textStyle?: StyleProp<TextStyle>;
  icon?: ButtonIcon;
  iconStyle?: StyleProp<ViewStyle>;
  max?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(View);

export default function Button({
  title = "Continue",
  onPress,
  loading = false,
  disabled = false,
  arrow = false,
  active = false,
  icon,
  iconStyle,
  children,
  max,
  style,
  textStyle,
}: ButtonProps) {
  // Theme Colors
  const primaryColor = useThemeColor({}, "primary");
  const cardColor = useThemeColor(
    { light: "#f4f4f4", dark: "#121212" },
    "card",
  );
  const textColorActive = useThemeColor({ light: "#fff" }, "text");
  const textColorInactive = useThemeColor({ dark: "#888" }, "text");
  const backgroundColorSurface = useThemeColor({}, "background");

  const colors = useMemo(() => {
    const ACTIVE_BG = primaryColor;
    const ACTIVE_TXT = textColorActive;

    return active
      ? { text: ACTIVE_TXT, bg: ACTIVE_BG }
      : { text: textColorInactive, bg: cardColor };
  }, [
    active,
    max,
    primaryColor,
    cardColor,
    textColorActive,
    textColorInactive,
  ]);

  // Animation State
  const isPressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .enabled(!disabled && !loading)
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      isPressed.value = false;
    })
    .onEnd(() => {
      if (onPress) onPress();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isPressed.value ? 0.96 : 1, { damping: 15 }) },
    ],
    opacity: loading ? 0.8 : disabled ? 0.5 : 1,
  }));

  return (
    <GestureDetector gesture={tap}>
      <AnimatedPressable
        style={[
          styles.button,
          { backgroundColor: colors.bg },
          max && { borderRadius: 12 },
          animatedStyle,
          style,
        ]}
      >
        {icon && (
          <View
            style={[
              styles.icon,
              { backgroundColor: backgroundColorSurface },
              iconStyle,
            ]}
          >
            {icon({ size: 18, color: textColorInactive }, active)}
          </View>
        )}

        <Text style={[styles.text, { color: colors.text }, textStyle]}>
          {title}
        </Text>

        {loading ? (
          <ActivityIndicator
            style={[
              styles.absoluteLoader,
              arrow === "left" ? { left: 12 } : { right: 12 },
            ]}
            color={colors.text}
          />
        ) : (
          <>
            {arrow === "left" && <ArrowLeft color={colors.text} />}
            {arrow === true && <ArrowRight color={colors.text} />}
          </>
        )}

        {children}
      </AnimatedPressable>
    </GestureDetector>
  );
}

const ArrowLeft = ({ color }: { color: string }) => (
  <Animated.View entering={FadeInRight} style={styles.arrowLeft}>
    <Icon color={color} size={ARROW_SIZE}>
      <Entypo name="chevron-thin-left" />
    </Icon>
  </Animated.View>
);

const ArrowRight = ({ color }: { color: string }) => (
  <Animated.View entering={FadeInLeft} style={styles.arrowRight}>
    <Icon color={color} size={ARROW_SIZE}>
      <Entypo name="chevron-thin-right" />
    </Icon>
  </Animated.View>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    minHeight: 56,
    // Web hover shadow/border emulation
    ...Platform.select({
      web: {
        cursor: "pointer",
        transitionProperty: "background-color",
        transitionDuration: "200ms",
      },
    }),
  },
  icon: {
    marginLeft: 12,
    padding: 6,
    borderRadius: BORDER_RADIUS / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  absoluteLoader: {
    position: "absolute",
  },
  arrowLeft: {
    position: "absolute",
    left: 8,
  },
  arrowRight: {
    position: "absolute",
    right: 8,
  },
});
