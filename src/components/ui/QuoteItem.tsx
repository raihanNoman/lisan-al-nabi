import { SCREEN } from "@/constants/Platform";
import { MaxContentWidth } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import Empty from "../Empty";
import { Text, View } from "../Themed";
import Animated, { FadeIn } from "react-native-reanimated";
import { HadithGradeColor, Quote } from "@/assets/data";
import { ExternalLink } from "../external-link";
import { usePlayerCtx } from "../player/ctx";
import AuxActions from "./AuxActions";
import Actions from "./Actions";
import TypingChunks from "../typing/TypingLine";

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
  const { player } = usePlayerCtx();

  useEffect(() => {
    if (index === current.index) {
      setTriggerStart(true);

      try {
        if (!current.quote?.audio) {
          player.pause();
          throw "no quote audio";
        }
        player.replace(current.quote.audio);
        player.play();
      } catch (e) {
        console.log("err playing quote", e);
      }
    } else {
      setTriggerStart(false);
    }
  }, [index, current.index]);

  if (!current.quote) return <Empty label="Err getting current quote" />;
  else if (index !== current.index)
    return <View style={[styles.item, { height }]} />;
  return (
    <View style={[styles.container, { height }]}>
      <Animated.View entering={FadeIn} style={[styles.item, { height }]}>
        <TypingChunks
          arabic
          triggerStart={triggerStart}
          chunks={current.quote.ar}
          size={50}
          script="Kitab"
        />

        <ExternalLink href={current.quote.link as any}>
          <Text
            style={{
              alignSelf: "center",
              marginHorizontal: "auto",
              color: HadithGradeColor[current.quote.grade],
            }}
          >
            {current.quote.book} • {current.quote.ref}
          </Text>
        </ExternalLink>

        <Actions />
        <AuxActions />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN.height,
    maxWidth: MaxContentWidth,
    margin: "auto",
    width: "100%",
    alignSelf: "center",
  },

  item: {
    height: SCREEN.height,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 80,
  },
});
