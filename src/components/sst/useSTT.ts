import { isWeb } from "@/constants/Platform";
import { setAudioModeAsync } from "expo-audio";
import {
    ExpoSpeechRecognitionModule,
    ExpoSpeechRecognitionResultSegment,
    useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import useSTTpermission from "./useSTTpermission";
import useSTTweb from "./useSTTweb";

export default function useSTT(onNewWord: (newWord: string) => void) {
    useSTTpermission();

    const [uri, setUri] = useState<string>();
    const [transcript, setTranscript] = useState("");
    const [recognizing, setRecognizing] = useState(false);

    const web = isWeb ? useSTTweb(setUri) : undefined;
    //const recorder = useRecorder()

    useSpeechRecognitionEvent(
        "result",

        (event) => {
            const segments = event?.results?.[0]?.segments;
            const latestIdx = segments.length - 1;
            const latestWord: ExpoSpeechRecognitionResultSegment = segments?.[latestIdx];
            console.log("🔹 recognized", latestWord?.segment);

            onNewWord(latestWord?.segment || "");

            //   const transcript_ = event.results[0]?.transcript;
            //   setTranscript(transcript_);

            if (event.isFinal) {
                // ?? this list is what doesnt wok on web?
                //   const words = event.results[0].segments;
                //   const list = words.map((word) => word.segment);
                //   console.log(list);

                const transcript_ = event.results[0]?.transcript;
                setTranscript(transcript_);
            }
        },
    );

    useSpeechRecognitionEvent("start", () => {
        console.log("\n🟢🎙️ Recording ........................... ");

        web?.startRecording();
        setRecognizing(true);
    });

    useSpeechRecognitionEvent("audioend", (e) => {
        if (!e.uri) return;
        console.log("recording uri: \n", e.uri);
        setUri(e.uri);
    });
    useSpeechRecognitionEvent("end", (e) => {
        console.log("\n🟥🎙️ Recording stopped ------------------- \n\n");

        web?.stopRecording();
        setRecognizing(false);
    });
    useSpeechRecognitionEvent("error", ({ error, message }) => {
        console.log("❌🎙️ Recording Error:", { error, message });

        if (error) Toast.show({ text1: error, type: "error" });
    });

    const startSTT = useCallback(async () => {
        try {
            // this fixes the problem of sound comming from microphone vs earpeace
            await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });

            ExpoSpeechRecognitionModule.start({
                lang: "ar-SA",
                interimResults: true,
                maxAlternatives: 1,
                continuous: false,
                iosTaskHint: "dictation",

                // add contextual string for accuracy
                recordingOptions: {
                    persist: true,
                    outputEncoding: "pcmFormatInt16",
                },
            });
        } catch (e) {
            console.log("❌ [starting expo-speech-recognition]", e);
        }
    }, []);

    const stopSTT = useCallback(async () => {
        try {
            await ExpoSpeechRecognitionModule.stop();

            await setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: false,
                interruptionMode: "duckOthers",
                shouldRouteThroughEarpiece: false, // Ensure this is explicitly false here too
            });
            // .then(() => console.log("reset audio mode"))
            // .catch((e) => console.log("🚩err resetting audio mode", e));

            // this fixes the problem of sound comming from microphone vs earpeace
        } catch (e) {
            console.log("❌ [stopping expo-speech-recognition]", e);
        }
    }, []);

    return { startSTT, stopSTT, recognizing, transcript, uri };
}

/**
       : (event) => {
                  if (event.isFinal) {
                      console.log(event);
                      setTranscript(event.results[0]?.transcript);

                      const words = event.results[0].segments;
                      const list = words.map((word) => word.segment);
                      console.log(list);

                      const latestIdx = words.length - 1;
                      const latestWord: ExpoSpeechRecognitionResultSegment = words[latestIdx];
                      onNewWord(latestWord.segment);
                  }
              },
 */
