import React, { useEffect } from "react";

import { isWeb } from "@/constants/Platform";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import { Alert } from "../../../utils/Alert";

export default function useSTTpermission() {
  useEffect(() => {
    (async () => {
      try {
        if (isWeb) {
          const res = await web_checkMic();
          if (!res) {
            console.warn("Permissions not granted @ web", res);
            return;
          }
        } else {
          const res =
            await ExpoSpeechRecognitionModule.requestPermissionsAsync();
          if (!res.granted) {
            console.warn("Permissions not granted", res);
            return;
          }
        }
      } catch (e) {
        console.log("err getting permission");
      }
    })();
  }, []);
}

async function web_checkMic(): Promise<boolean> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
    return false;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Mic available ✅
    stream.getTracks().forEach((track) => track.stop()); // stop immediately
    console.log("✅ 🎤 Mic permission granted");

    return true;
  } catch (err) {
    console.log("❌ Mic permission error:", err);
    Alert(
      "Cannot test ayat recitation",
      "No mic detected. Make sure you have a mic connected to your device and granted permission",
    );
    // User denied permission or no mic
    return false;
  }
}
