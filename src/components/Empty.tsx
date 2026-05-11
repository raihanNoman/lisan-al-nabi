import { useTheme } from "@/hooks/use-theme";
import React, { PropsWithChildren } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBox } from "../../types/styles";
import { Text } from "./themed";

interface EmptyProps extends TextBox, PropsWithChildren {
  label?: string;
  icon?: any;
  loading?: boolean;
  fillScreen?: boolean;
}

export default function Empty({
  label = "No more items",
  icon,
  loading,
  fillScreen,
  boxStyle,
  txtStyle,
  children,
}: EmptyProps) {
  const color = useTheme();

  const Icon =
    icon &&
    React.cloneElement(icon, {
      size: 120, // Default size
      color: icon.props.color || color.text, // Default color
      style: [{ opacity: 0.3 }, icon.props.style], // Merge opacity and existing styles
    });

  return (
    <SafeAreaView style={[styles.root, fillScreen && styles.fill, boxStyle]}>
      {Icon}
      {loading && <ActivityIndicator style={styles.loading} />}
      {label && <Text style={[styles.label, txtStyle]}>{label}</Text>}
      {children}
    </SafeAreaView>
  );
}

export const LoadingScreen = Empty;
export const _Empty = (props: EmptyProps) => <Empty {...props} />;

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center" },
  fill: { height, width },
  label: { margin: 24 },
  loading: { margin: 12 },
});
