import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

const appointments = [
  { provider: "Dr. Sarah Chen", time: "12:20 AM · ~4h away", mode: "In-Person" },
  { provider: "Dr. Marcus Webb", time: "6:20 PM · ~22h away", mode: "Telehealth" },
];

const missedMedications = [
  { name: "Lisinopril 10 mg", schedule: "8:00 AM · Once daily" },
  { name: "Metformin 500 mg", schedule: "8:00 AM, 8:00 PM · Twice daily" },
];

export function Home() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandGlyph}>✦</Text></View>
            <Text selectable style={styles.brand}>CareConnect</Text>
            <View style={styles.flex} />
            <AppButton label="Highlights" icon={<Text style={styles.buttonIcon}>ⓘ</Text>} onPress={() => {}} variant="secondary" />
          </View>
          <Text selectable style={styles.greeting}>Good morning,{"\n"}Jordan</Text>
          <Text selectable style={styles.date}>Mon, Aug 31</Text>
          <View style={styles.statsRow}>
            <Stat value="3" label="Appointments" color="#506D91" />
            <Stat value="4" label="Meds" color="#D55229" />
            <Stat value="2" label="Unread" color="#2E62D8" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.alertPanel, styles.bluePanel]}>
            <Text style={styles.panelIcon}>▣</Text>
            <Text selectable style={[styles.panelTitle, styles.blueText]}>2 appointments in the next 24 hours</Text>
            {appointments.map((appointment) => (
              <View key={appointment.provider} style={styles.miniCard}>
                <View style={styles.flex}>
                  <Text selectable style={styles.miniTitle}>{appointment.provider}</Text>
                  <Text selectable style={styles.miniMeta}>{appointment.time}</Text>
                </View>
                <Text selectable style={styles.chip}>{appointment.mode}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.alertPanel, styles.orangePanel]}>
            <Text style={styles.panelIcon}>!</Text>
            <Text selectable style={[styles.panelTitle, styles.orangeText]}>2 missed doses today</Text>
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

          <AppButton label="View appointments" onPress={() => router.push("/appointments")} />
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <View style={[styles.stat, { backgroundColor: color }]}>
      <Text selectable style={styles.statValue}>{value}</Text>
      <Text selectable style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.lg },
  hero: { backgroundColor: colors.navy, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: 30, gap: spacing.md },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  brandMark: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center" },
  brandGlyph: { color: colors.white, fontSize: 22 },
  brand: { color: "#D4DEED", fontSize: 18, fontWeight: "700" },
  flex: { flex: 1 },
  buttonIcon: { color: colors.navy, fontSize: 17 },
  greeting: { color: colors.white, fontSize: 30, lineHeight: 35, fontWeight: "800" },
  date: { color: "#C7D2E2", fontSize: 18 },
  statsRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  stat: { flex: 1, minHeight: 88, borderRadius: 16, alignItems: "center", justifyContent: "center", gap: 3 },
  statValue: { color: colors.white, fontSize: 30, fontWeight: "800", fontVariant: ["tabular-nums"] },
  statLabel: { color: colors.white, fontSize: 12, fontWeight: "700", textAlign: "center" },
  section: { padding: spacing.lg, gap: spacing.lg },
  alertPanel: { padding: spacing.md, borderRadius: 20, gap: spacing.sm, borderWidth: 1 },
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
});
