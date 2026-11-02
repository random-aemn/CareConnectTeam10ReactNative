import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="appointments" />
      <Stack.Screen name="medications" />
      <Stack.Screen name="inbox" />
      <Stack.Screen name="highlights" />
    </Stack>
  );
}
