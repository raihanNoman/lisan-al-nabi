import { createContext, PropsWithChildren, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";
import { AudioPlayer, useAudioPlayer } from "expo-audio";

interface PlayerCtx {
  highlight: SharedValue<number>;
  player: AudioPlayer;
}
const Context = createContext<PlayerCtx | undefined>(undefined);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const highlight = useSharedValue<number>(0);
  const player = useAudioPlayer(null);

  return (
    <Context.Provider value={{ player, highlight }}>
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
