import { Text, View } from "@/components/Themed";
import React, { useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import Empty from "@/components/Empty";
import { useArabic } from "@/components/themed-arabic";
import { shuffle } from "../../../../utils/array";
import { SafeAreaView } from "react-native-safe-area-context";
import { getArrayByRange } from "../../../../utils/get";
import DuoDragDrop, {
  DuoDragDropRef,
  Word,
} from "@jamsch/react-native-duo-drag-drop";
import {
  arabicWordStyle,
  RenderLines,
  RenderPlaceHolder,
} from "@/components/ui/DragDrop";
import Haptic from "@/components/Haptics";
import { AudioSources, usePlayerCtx } from "@/components/player/ctx";
import { useStateLooper } from "@/hooks/use-state-looper";
import { router } from "expo-router";

export default function PracticeScreen() {
  const { play } = usePlayerCtx();
  const quote = useAppSelector((s) => s.quote.current.quote);

  const arabicStyle = useArabic({ size });
  const ref = useRef<DuoDragDropRef>(null);

  if (!quote) return <Empty label="No quotes to practice" />;

  const idxState = useStateLooper(
    getArrayByRange(0, quote?.ar.length || 0), //
    {
      onReachEnd: {
        continue: false,
        execute: onReactEnd,
      },
    },
  );
  const idx = idxState.currentOption;
  const translation = quote.en[idx];
  const arabic = quote.ar[idx];
  const randomizedWords = useMemo(() => shuffle(arabic.split(" ")), [idx]);

  function onReactEnd() {
    router.push({ pathname: "/practice/grade" });
  }

  const onCorrect = () => {
    play(AudioSources["✅"]);
    Haptic.success();
    console.log("✅");

    idxState.trigger.next();
  };

  const onWrong = () => {
    play(AudioSources["❌"]);
    Haptic.err();
    console.log("❌");
  };

  function check() {
    try {
      const answer = ref.current?.getAnsweredWords();
      if (!answer) throw "no answer";
      if (answer.length < randomizedWords.length) return; // not all selected yet

      const answerText = answer.join(" ");
      answerText === arabic //
        ? onCorrect()
        : onWrong();
    } catch (e) {
      console.log("err checking chunk", e);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View type="background" style={{ padding: 12 }}>
        <Text>{translation}</Text>
      </View>
      <DuoDragDrop
        ref={ref}
        // gesturesDisabled={submitted}
        rtl
        onDrop={check}
        words={randomizedWords}
        wordHeight={size * 2} // onDrop // lineHeight={size * 3}  // wordBankOffsetY={size / 2}
        wordGap={size / 10}
        wordBankAlignment="center"
        renderWord={() => (
          <Word containerStyle={arabicWordStyle} textStyle={arabicStyle} />
        )}
        renderLines={RenderLines}
        renderPlaceholder={RenderPlaceHolder}
      />
    </SafeAreaView>
  );
}

const fontSize = 30;
const size = fontSize * 1.2;
const styles = StyleSheet.create({
  item: {},
  dropZone: {
    width: 80,
    height: size,
    backgroundColor: "#888",
    margin: 8,
    borderRadius: 12,
  },
});
