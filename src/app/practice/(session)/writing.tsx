import { Text, View } from "@/components/Themed";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {}

export default function PracticeWriting({}: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text>Writing Practice</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
