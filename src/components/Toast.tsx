import { useTheme } from "@/hooks/use-theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type or create a custom one
  */
  success: (props) => {
    const card = useTheme().background;
    const text = useTheme().text;
    const secondary = useThemeColor({}, "textSecondary");
    const green = useThemeColor({}, "correct");

    return (
      <BaseToast
        {...props}
        style={{ borderLeftColor: green, backgroundColor: card }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 15, fontWeight: "600", color: text }}
        text2Style={{ fontSize: 13, color: secondary }}
      />
    );
  },

  error: (props) => {
    const card = useThemeColor({}, "card");
    const text = useThemeColor({}, "text");
    const secondary = useThemeColor({}, "textSecondary");
    const red = useThemeColor({}, "wrong") || "#ff4444";

    return (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: red, backgroundColor: card }}
        text1Style={{ color: text }}
        text2Style={{ color: secondary }}
      />
    );
  },
};
