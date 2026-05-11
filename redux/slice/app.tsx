import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppTheme = "system" | "light" | "dark";

const initialState = {
  theme: "system" as AppTheme, // @debug: change to undefined
  forcedTheme: null as "dark" | "light" | null,
  tabbarHidden: false,
};

const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setAppTheme(s, a: PayloadAction<AppTheme>) {
      s.theme = a.payload;
    },
    setForcedTheme(s, a: PayloadAction<"dark" | "light" | null>) {
      s.forcedTheme = a.payload;
    },

    setTabbarHidden(s, a: PayloadAction<boolean | "toggle">) {
      if (a.payload === "toggle") s.tabbarHidden = !s.tabbarHidden;
      else s.tabbarHidden = a.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const useAsyncTheme = () => useAsyncStorage("@theme");
export default appSlice.reducer;
export const { setAppTheme, setForcedTheme, setTabbarHidden } =
  appSlice.actions;

export function isAppTheme(value: unknown): value is AppTheme {
  return value === "system" || value === "light" || value === "dark";
}
