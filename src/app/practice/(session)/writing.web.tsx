import Empty from "@/components/Empty";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {}

export default function PracticeWriting({}: Props) {
  return (
    <Empty label="Writing Recognition is not available for web. Recognition uses machine learning (ML) software closely connected to your phones hardware. Please download the mobile app to start practicing writing." />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
