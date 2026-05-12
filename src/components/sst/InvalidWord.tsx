import React from "react";
import { StyleSheet } from "react-native";

import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvalidWord() {
  return (
    <SafeAreaView style={styles.root}>
      <Text>No word</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
