import { SCREEN } from "@/constants/Platform";
import { MaxContentWidth } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import Empty from "../Empty";
import { Text, View } from "../themed";
import Typing from "../Typing";
import Animated, { FadeIn } from "react-native-reanimated";

export default function QuoteItem({
  height,
  id,
  index,
}: {
  height: number;
  index: number;
  id: string;
}) {
  const current = useAppSelector((s) => s.quote.current);
  const [triggerStart, setTriggerStart] = useState(false);
  useEffect(() => {
    if (index === current.index) setTriggerStart(true);
    else setTriggerStart(false);
  }, [index, current.index]);

  if (!current.quote) return <Empty label="Err getting current quote" />;
  else if (index !== current.index)
    return <View style={[styles.item, { height }]} />;
  return (
    <View style={[styles.item, { height }]}>
      <Animated.View entering={FadeIn}>
        <Typing
          arabic
          triggerStart={triggerStart}
          text={current.quote.ar}
          size={50}
        />
        <Text>QuoteItem {index}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: SCREEN.height,
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
