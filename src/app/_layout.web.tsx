import { Stack } from "expo-router";

import "@/global.css";

export default function WebLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
