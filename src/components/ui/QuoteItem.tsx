import { QUOTES } from "@/assets/data";
import { MaxContentWidth } from "@/constants/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../themed";
import Typing from "../Typing";

export default function QuoteItem({
  height,
  id,
  index,
}: {
  height: number;
  index: number;
  id: string;
}) {
  return (
    <View
      style={{
        backgroundColor: id,
        height,
        maxWidth: MaxContentWidth,
        alignSelf: "center",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typing arabic text={QUOTES[0].ar} speedMS={300} size={50} />
      <Text>QuoteItem {index}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
