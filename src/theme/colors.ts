import { Platform } from "react-native";
import { Color } from "expo-router";

export const colors = {
  primary: Platform.select({
    ios: Color.ios.systemBlue,
    android: Color.android.dynamic.primary,
    default: "#24466F",
  })!,
  navy: "#24466F",
  blue: "#2D6BFF",
  background: "#F8F9FB",
  surface: "#FFFFFF",
  ink: "#131C2E",
  muted: "#60738F",
  border: "#D7E0EC",
  paleBlue: "#F1F6FF",
  paleOrange: "#FFF7ED",
  orange: "#FF5A1F",
  green: "#137333",
  red: "#BE1E2D",
  white: "#FFFFFF",
} as const;
