import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontSource, useFonts as useExpoFonts } from "expo-font";
import { Platform } from "react-native";
import { QuranScript } from "./types";

// export function useCustomFonts() {
//   // On mobile, just return true — native bundling works via Expo Google Fonts automatically
//   if (Platform.OS === "web") {
//     const [orbitronLoaded] = useOrbitron({ Orbitron_400Regular, Orbitron_700Bold });
//     const [anekLoaded] = useAnek({ AnekLatin_400Regular, AnekLatin_700Bold });
//   }
// }

// @future: Add Translation fonts

const FONTS: Record<QuranScript, FontSource> = {
    KFG_bold: require("@/assets/fonts/KFG-Bold.ttf"),
    KFG: require("@/assets/fonts/KFG-Regular.ttf"),
    kitab: require("@/assets/fonts/Kitab-Regular.ttf"),
    sura_name: require("@/assets/fonts/sura_names.ttf"),
};

const useFonts = () => useExpoFonts({ ...FONTS, ...FontAwesome.font });
export default useFonts;

export const FONT = {
    Orbitron: {
        _400: Platform.select({
            ios: "Orbitron-Regular",

            default: "Orbitron_400Regular",
        }),
        _700: Platform.select({
            ios: "Orbitron-Bold",
            default: "Orbitron_700Bold",
        }),
    },

    AnekLatin: {
        _400: Platform.select({
            ios: "AnekLatin-Regular",
            default: "AnekLatin_400Regular",
        }),
        _700: Platform.select({
            ios: "AnekLatin-Bold",
            default: "AnekLatin_700Bold",
        }),
    },
};
