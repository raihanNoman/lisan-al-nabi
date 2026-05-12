import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFonts from "@/assets/fonts/useFonts";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import PlayerProvider from "@/components/player/ctx";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts();

  useEffect(() => {
    if (error) throw error; // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  }, [error]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView>
      <PlayerProvider>
        <Provider store={store}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AnimatedSplashOverlay />
            <AppTabs />
          </ThemeProvider>
        </Provider>
      </PlayerProvider>
    </GestureHandlerRootView>
  );
}
