import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

const appointments = [
  { provider: "Dr. Sarah Chen", time: "12:20 AM, approximately 4 hours away", mode: "In-Person" },
  { provider: "Dr. Marcus Webb", time: "6:20 PM, approximately 22 hours away", mode: "Telehealth" },
];

const missedMedications = [
  { name: "Lisinopril 10 mg", schedule: "8:00 AM · Once daily" },
  { name: "Metformin 500 mg", schedule: "8:00 AM, 8:00 PM · Twice daily" },
];

export function Home() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={[styles.hero, wide && styles.wideHero]}>
          <View style={styles.brandRow}>
            <View accessible={false} importantForAccessibility="no-hide-descendants" style={styles.brandMark}><Text style={styles.brandGlyph}>✦</Text></View>
            <Text selectable style={styles.brand}>CareConnect</Text>
            <View style={styles.flex} />
            <AppButton label="Highlights" icon={<Text accessible={false} style={styles.buttonIcon}>ⓘ</Text>} onPress={() => router.push("/highlights")} variant="secondary" accessibilityHint="Shows today's health highlights" />
          </View>
          <Text selectable accessibilityRole="header" style={styles.greeting}>Good morning,{"\n"}Jordan</Text>
          <Text selectable style={styles.date}>Mon, Aug 31</Text>
          <View style={[styles.statsRow, wide && styles.wideStatsRow]}>
            <Stat value="3" label="Appointments" color="#506D91" />
            <Stat value="4" label="Meds" color="#A63B1B" />
            <Stat value="2" label="Unread" color="#2E62D8" />
          </View>
        </View>

        <View style={[styles.section, wide && styles.wideSection]}>
          <View style={[styles.alertPanel, styles.bluePanel, wide && styles.widePanel]}>
            <Text accessible={false} style={styles.panelIcon}>▣</Text>
            <Text selectable accessibilityRole="header" style={[styles.panelTitle, styles.blueText]}>2 appointments in the next 24 hours</Text>
            {appointments.map((appointment) => (
              <View
                key={appointment.provider}
                accessible
                accessibilityRole="summary"
                accessibilityLabel={`${appointment.provider}, ${appointment.time}, ${appointment.mode}`}
                style={styles.miniCard}
              >
                <View style={styles.flex}>
                  <Text selectable style={styles.miniTitle}>{appointment.provider}</Text>
                  <Text selectable style={styles.miniMeta}>{appointment.time}</Text>
                </View>
                <Text selectable style={styles.chip}>{appointment.mode}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.alertPanel, styles.orangePanel, wide && styles.widePanel]}>
            <Text accessible={false} style={[styles.panelIcon, styles.orangeText]}>!</Text>
            <Text selectable accessibilityRole="header" style={[styles.panelTitle, styles.orangeText]}>2 missed doses today</Text>
            {missedMedications.map((medication) => (
              <View key={medication.name} style={[styles.miniCard, styles.orangeCard]}>
                <View style={styles.flex}>
                  <Text selectable style={styles.miniTitle}>{medication.name}</Text>
                  <Text selectable style={styles.miniMeta}>{medication.schedule}</Text>
                </View>
                <Text selectable style={styles.missedChip}>Missed</Text>
              </View>
            ))}
          </View>

          <View style={wide && styles.wideAction}><AppButton label="View appointments" onPress={() => router.push("/appointments")} /></View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <View accessible accessibilityRole="summary" accessibilityLabel={`${value} ${label}`} style={[styles.stat, { backgroundColor: color }]}>
      <Text selectable style={styles.statValue}>{value}</Text>
      <Text selectable style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.lg, width: "100%" },
  wideContent: { alignSelf: "center", maxWidth: 980 },
  hero: { backgroundColor: colors.navy, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: 30, gap: spacing.md },
  wideHero: { paddingHorizontal: spacing.xl },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  brandMark: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center" },
  brandGlyph: { color: colors.white, fontSize: 22 },
  brand: { color: "#D4DEED", fontSize: 18, fontWeight: "700" },
  flex: { flex: 1 },
  buttonIcon: { color: colors.navy, fontSize: 17 },
  greeting: { color: colors.white, fontSize: 30, lineHeight: 35, fontWeight: "800" },
  date: { color: "#C7D2E2", fontSize: 18 },
  statsRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  wideStatsRow: { maxWidth: 620 },
  stat: { flex: 1, minHeight: 88, borderRadius: 16, alignItems: "center", justifyContent: "center", gap: 3 },
  statValue: { color: colors.white, fontSize: 30, fontWeight: "800", fontVariant: ["tabular-nums"] },
  statLabel: { color: colors.white, fontSize: 12, fontWeight: "700", textAlign: "center" },
  section: { padding: spacing.lg, gap: spacing.lg },
  wideSection: { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
  alertPanel: { padding: spacing.md, borderRadius: 20, gap: spacing.sm, borderWidth: 1 },
  widePanel: { flex: 1, minWidth: 320 },
  bluePanel: { backgroundColor: colors.paleBlue, borderColor: "#B9D4FF" },
  orangePanel: { backgroundColor: colors.paleOrange, borderColor: "#FFC58D" },
  panelIcon: { color: colors.blue, fontSize: 25, fontWeight: "800" },
  panelTitle: { fontSize: 19, lineHeight: 25, fontWeight: "800" },
  blueText: { color: "#1E4FC4" },
  orangeText: { color: "#9C3417" },
  miniCard: { flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.md, backgroundColor: colors.surface, borderRadius: 15, borderWidth: 1, borderColor: "#D6E4FA" },
  orangeCard: { borderColor: "#FFD5B1" },
  miniTitle: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  miniMeta: { color: colors.muted, marginTop: 4, fontSize: 14 },
  chip: { color: colors.navy, backgroundColor: "#EAF1FB", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, overflow: "hidden", fontSize: 12, fontWeight: "700" },
  missedChip: { color: colors.red, backgroundColor: "#FFF0F0", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, overflow: "hidden", fontSize: 12, fontWeight: "700" },
  wideAction: { width: "100%" },
});
