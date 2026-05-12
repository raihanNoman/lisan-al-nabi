import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { AudioPlayer, AudioSource, useAudioPlayer } from "expo-audio";
import { useEvent } from "expo";

interface PlayerCtx {
  highlight: SharedValue<number>;
  player: AudioPlayer;
  play: (src: AudioSource) => void;
}
const Context = createContext<PlayerCtx | undefined>(undefined);

export const AudioSources = {
  ["✅"]: require("@/assets/chime/correct.wav") as AudioSource,
  ["❌"]: require("@/assets/chime/wrong.mp3") as AudioSource,
};

export const usePlayerStatus = (player: AudioPlayer) =>
  useEvent(player, "playbackStatusUpdate");

export const useIsPlaying = (player: AudioPlayer) =>
  Boolean(useEvent(player, "playbackStatusUpdate")?.playing);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const highlight = useSharedValue<number>(0);
  const player = useAudioPlayer(null);

  const play = useCallback((src: AudioSource) => {
    try {
      player.replace(src);
      player.play();
    } catch (e) {
      console.log("er playing source");
    }
  }, []);

  return (
    <Context.Provider value={{ player, highlight, play }}>
      {children}
    </Context.Provider>
  );
}

export const usePlayerCtx = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("usePlayerCtx must be used within PlayerProvider");
  return context;
};
