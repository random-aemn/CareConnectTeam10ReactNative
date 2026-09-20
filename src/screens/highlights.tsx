import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

const todaysMedications = [
  { name: "Lisinopril", dose: "10 mg", schedule: "8:00 AM", status: "Missed" },
  { name: "Metformin", dose: "500 mg", schedule: "8:00 AM and 8:00 PM", status: "Morning dose missed" },
  { name: "Atorvastatin", dose: "20 mg", schedule: "9:00 PM", status: "Upcoming" },
  { name: "Vitamin D3", dose: "2000 IU", schedule: "8:00 AM", status: "On track" },
] as const;

const todaysMessages = [
  {
    provider: "Dr. Sarah Chen",
    specialty: "Primary Care",
    time: "9:18 AM",
    text: "Your lab results look good. Let us know if you have any questions.",
    unread: true,
  },
] as const;

export default function HighlightsScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={styles.headerRow}>
          <View style={styles.flex}>
            <Text selectable accessibilityRole="header" style={styles.title}>Today&apos;s Highlights</Text>
            <Text selectable style={styles.date}>Monday, August 31, 2026</Text>
          </View>
          <AppButton label="Back to home" variant="secondary" onPress={() => router.replace("/")} accessibilityHint="Returns to the Home screen" />
        </View>

        <HighlightSection title="Medications today" count={todaysMedications.length}>
          {todaysMedications.map((medication) => (
            <View
              key={medication.name}
              accessible
              accessibilityRole="summary"
              accessibilityLabel={`${medication.name}, ${medication.dose}, scheduled for ${medication.schedule}, status ${medication.status}`}
              style={styles.item}
            >
              <View style={styles.itemHeadingRow}>
                <Text selectable style={styles.itemTitle}>{medication.name} <Text style={styles.itemDetail}>{medication.dose}</Text></Text>
                <Text accessible={false} selectable style={styles.status}>{medication.status}</Text>
              </View>
              <Text selectable style={styles.itemDetail}>Scheduled: {medication.schedule}</Text>
            </View>
          ))}
        </HighlightSection>

        <HighlightSection title="Messages received today" count={todaysMessages.length}>
          {todaysMessages.map((message) => (
            <View
              key={`${message.provider}-${message.time}`}
              accessible
              accessibilityRole="summary"
              accessibilityLabel={`${message.unread ? "Unread message" : "Message"} from ${message.provider}, ${message.specialty}, received at ${message.time}. ${message.text}`}
              style={styles.item}
            >
              <View style={styles.itemHeadingRow}>
                <Text selectable style={styles.itemTitle}>{message.provider}</Text>
                <Text selectable style={styles.itemDetail}>{message.time}</Text>
              </View>
              <Text selectable style={styles.itemDetail}>{message.specialty}</Text>
              <Text selectable style={styles.message}>{message.text}</Text>
            </View>
          ))}
        </HighlightSection>

        <HighlightSection title="Appointments today" count={0}>
          <Text accessible accessibilityRole="summary" style={styles.empty}>No appointments today.</Text>
        </HighlightSection>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

function HighlightSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text selectable accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
        <Text accessible accessibilityLabel={`${count} ${count === 1 ? "item" : "items"}`} style={styles.count}>{count}</Text>
      </View>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
  wideContent: { maxWidth: 980, alignSelf: "center" },
  headerRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.md },
  flex: { flex: 1, minWidth: 220 },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" },
  date: { color: colors.muted, fontSize: 16, marginTop: 4 },
  section: { padding: spacing.md, borderRadius: 19, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, gap: spacing.md },
  sectionHeader: { minHeight: 44, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  sectionTitle: { flex: 1, color: colors.ink, fontSize: 20, fontWeight: "800" },
  count: { minWidth: 32, minHeight: 32, textAlign: "center", textAlignVertical: "center", borderRadius: 16, overflow: "hidden", color: colors.navy, backgroundColor: "#EAF1FB", fontWeight: "800" },
  items: { gap: spacing.sm },
  item: { minHeight: 44, padding: spacing.md, borderRadius: 14, backgroundColor: "#F5F8FC", gap: 5 },
  itemHeadingRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: spacing.sm },
  itemTitle: { flex: 1, color: colors.ink, fontSize: 17, fontWeight: "800" },
  itemDetail: { color: colors.muted, fontSize: 14, fontWeight: "500" },
  status: { color: colors.navy, fontSize: 13, fontWeight: "800" },
  message: { color: colors.ink, fontSize: 15, lineHeight: 22 },
  empty: { minHeight: 44, padding: spacing.md, color: colors.muted, fontSize: 16, textAlign: "center" },
});
