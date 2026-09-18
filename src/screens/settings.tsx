import { StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/theme";

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text accessible accessibilityRole="header" style={styles.title}>Settings</Text>
      <Text selectable style={styles.description}>No settings are available yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" },
  description: { color: colors.muted, fontSize: 16, marginTop: spacing.md },
});
