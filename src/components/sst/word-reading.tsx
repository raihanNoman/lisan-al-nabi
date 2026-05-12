import { Pressable, StyleSheet } from "react-native";
import Haptic from "@/components/Haptics";
import { Icon, Text } from "@/components/Themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "./ChatBubble";
import InvalidWord from "./InvalidWord";
import isSimilar from "./similarity";
import useSTT from "./useSTT";
import Arabic from "../themed-arabic";
import { Alert } from "../../../utils/Alert";
import { AudioSources, useIsPlaying, usePlayerCtx } from "../player/ctx";
import { AudioSource } from "expo-audio";
import Button from "../Button";

export default function WordReading({
  arabicWord,
  arabicWordUrl,
  onContinue,
}: {
  arabicWord: string;
  arabicWordUrl: AudioSource;
  onContinue(): void;
}) {
  const { player, play } = usePlayerCtx();
  const isPlaying = useIsPlaying(player);

  const playWord = () => play(arabicWordUrl);

  useEffect(
    function onMount() {
      playWord();
    },
    [arabicWord],
  );

  const [newSpoken, setNewSpoken] = useState("");
  const { recognizing, transcript, uri, startSTT, stopSTT } =
    useSTT(setNewSpoken);
  const [loading, setLoading] = useState(false);

  const check = useCallback(() => {
    stopSTT();

    if (isSimilar(newSpoken, arabicWord, 40)) {
      console.log("passed  ✅✅✅");

      Haptic.success();
      play(AudioSources["✅"]);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        onContinue();
      }, 600);
    } else {
      console.log("failed  🚩🚩🚩");

      play(AudioSources["❌"]);
      Haptic.err();
    }
  }, [newSpoken, arabicWord, stopSTT]);

  useEffect(() => {
    if (isSimilar(newSpoken, arabicWord, 40)) {
      console.log("passed  ✅✅✅");
      stopSTT();

      Haptic.success();
      play(AudioSources["✅"]);

      setTimeout(() => {
        onContinue();
      }, 1200);
    }
  }, [newSpoken]);

  if (!arabicWord) return <InvalidWord />;
  return (
    <SafeAreaView style={styles.flex1} edges={["bottom"]}>
      <Pressable onPress={() => play(arabicWordUrl)}>
        <ChatBubble left style={{ paddingHorizontal: 12 }}>
          <Arabic size={50} script="KFG">
            {arabicWord}
          </Arabic>
        </ChatBubble>
      </Pressable>

      {(recognizing || transcript) && (
        <Pressable
          onPress={() =>
            uri
              ? play({ uri: uri })
              : Alert(
                  "Invalid url",
                  "Could not replay your recording at this moment. Please go to settings to allow permission to record.",
                )
          }
        >
          <ChatBubble right style={{ paddingHorizontal: 12 }}>
            <Arabic size={50}>{transcript || "..."}</Arabic>
          </ChatBubble>{" "}
        </Pressable>
      )}

      <RecordingBtn
        isPlaying={isPlaying}
        recognizing={recognizing}
        onPress={recognizing ? stopSTT : startSTT}
      />

      <Button
        loading={loading}
        disabled={isPlaying || recognizing}
        active={Boolean(transcript.length <= 0)}
        arrow={Boolean(transcript.length <= 0) ? "left" : false}
        onPress={check}
      />
    </SafeAreaView>
  );
}

export const RecordingBtn = ({
  isPlaying,
  recognizing,
  onPress,
}: {
  isPlaying: boolean;
  recognizing: boolean;
  onPress(): void;
}) => (
  <Pressable
    style={styles.recordBtn}
    disabled={isPlaying}
    onPress={onPress}
    // animate={{
    //     borderColor: recognizing ? "#888" : "#f00",
    //     backgroundColor: recognizing ? "#8883" : "#f003",
    //     width: recognizing ? 140 : SAFE_SCREEN_WIDTH - 24,
    // }}
  >
    {recognizing ? <Recording /> : <TapToSpeak />}
  </Pressable>
);

export const Recording = () => (
  <Icon size={25} color="#888">
    <Ionicons name="recording" />
  </Icon>
);
export const TapToSpeak = () => (
  <Text style={{ fontSize: 20, color: "#f00" }} numberOfLines={1}>
    <Icon size={20} color="#f00">
      <FontAwesome name="microphone" />
    </Icon>
    {"  "}
    Tap to Speak
  </Text>
);

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  recordBtn: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 24,
    borderRadius: 24,
    borderWidth: 3,
    backgroundColor: "#f004",
    marginHorizontal: 12,
    marginTop: 20,
  },
});
