import { StyleSheet, Text, View } from "react-native";

import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

export default function InboxScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text selectable style={styles.title}>Inbox</Text>
        <Text selectable style={styles.subtitle}>Your care team messages will appear here.</Text>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.lg, gap: spacing.sm },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 17 },
});
