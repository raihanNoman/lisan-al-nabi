import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import { useAppSelector } from "../../../redux/hooks";
import Toast from "react-native-toast-message";
import Haptic from "../Haptics";

export const copyToClipboard = async (link: string) => {
  await Clipboard.setStringAsync("hello world");
  Toast.show({
    type: "info",
    text1: "Copied to clipboard",
    text2: link,
  });
  Haptic.success();
};

export default function AuxActions() {
  const currentQuote = useAppSelector((s) => s.quote.current.quote);

  const _copyToClipboard = () =>
    currentQuote?.link && copyToClipboard(currentQuote?.link);

  return (
    <View>
      <Text>Actions</Text>
      <Pressable onPress={_copyToClipboard}>
        <Feather name="copy" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
