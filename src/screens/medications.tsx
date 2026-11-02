import { useState } from "react";
import { AccessibilityInfo, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

const initialMedications = [
  { name: "Lisinopril", dose: "10 mg", schedule: "Once daily · 8:00 AM", doctor: "Chen", refill: "Sep 14, 2026", missed: true },
  { name: "Metformin", dose: "500 mg", schedule: "Twice daily · 8:00 AM, 8:00 PM", doctor: "Nair", refill: "Sep 22, 2026", missed: true },
  { name: "Atorvastatin", dose: "20 mg", schedule: "Once daily (evening) · 9:00 PM", doctor: "Webb", refill: "Oct 3, 2026", missed: false },
  { name: "Vitamin D3", dose: "2000 IU", schedule: "Once daily · 8:00 AM", doctor: "Chen", refill: "Nov 1, 2026", missed: false },
];

export default function MedicationsScreen() {
  const [medications, setMedications] = useState(initialMedications);
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  function markTaken(name: string) {
    setMedications((current) => current.map((medication) => medication.name === name ? { ...medication, missed: false } : medication));
    AccessibilityInfo.announceForAccessibility(`${name} marked as taken`);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <Text selectable accessibilityRole="header" style={styles.title}>Medications</Text>
        <Text selectable style={styles.subtitle}>Your active prescriptions</Text>
        <View style={[styles.cards, wide && styles.wideCards]}>
          {medications.map((medication) => (
          <View
            key={medication.name}
            accessible
            accessibilityRole="summary"
            accessibilityLabel={`${medication.name}, ${medication.dose}, ${medication.schedule}, prescribed by Doctor ${medication.doctor}, refill ${medication.refill}, status ${medication.missed ? "missed" : "on track"}`}
            accessibilityHint={medication.missed ? "Actions available: mark taken and refill" : "Action available: refill"}
            accessibilityActions={[
              ...(medication.missed ? [{ name: "markTaken", label: "Mark taken" }] : []),
              { name: "refill", label: "Refill" },
            ]}
            onAccessibilityAction={(event) => {
              if (event.nativeEvent.actionName === "markTaken") markTaken(medication.name);
            }}
            style={[styles.card, wide && styles.wideCard, medication.missed && styles.missedCard]}
          >
            <View accessible={false} importantForAccessibility="no-hide-descendants" style={styles.icon}><Text style={styles.iconText}>✚</Text></View>
            <View style={styles.details}>
              <View
                accessible={false}
                style={styles.medicationSummary}
              >
                <View style={styles.nameRow}>
                  <Text selectable style={styles.name}>{medication.name} <Text style={styles.dose}>{medication.dose}</Text></Text>
                  <Text accessible={false} selectable style={[styles.status, medication.missed ? styles.missedStatus : styles.trackStatus]}>{medication.missed ? "Missed" : "On track"}</Text>
                </View>
                <Text selectable style={styles.meta}>{medication.schedule}</Text>
                <View style={styles.metaRow}><Text selectable style={styles.meta}>By: {medication.doctor}</Text><Text selectable style={styles.meta}>Refill: {medication.refill}</Text></View>
              </View>
              <View style={styles.actions}>
                {medication.missed && <AppButton label="Mark taken" accessibilityLabel={`Mark ${medication.name} as taken`} accessibilityHint="Updates this medication status to on track" onPress={() => markTaken(medication.name)} />}
                <AppButton label="Refill" accessibilityLabel={`Refill ${medication.name}`} accessibilityHint="Starts a refill request" onPress={() => {}} variant="secondary" />
              </View>
            </View>
          </View>
          ))}
        </View>
        <View style={styles.footer}><Text selectable style={styles.footerText}>Need to add a medication? Contact your care team.</Text></View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xl, width: "100%" },
  wideContent: { alignSelf: "center", maxWidth: 980 },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800", marginBottom: 2 },
  subtitle: { color: colors.muted, fontSize: 18, marginBottom: spacing.lg },
  cards: { gap: spacing.md },
  wideCards: { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
  card: { flexDirection: "row", gap: spacing.md, padding: spacing.md, backgroundColor: colors.surface, borderRadius: 19, borderWidth: 1, borderColor: colors.border },
  wideCard: { flexGrow: 1, flexBasis: "46%", minWidth: 320 },
  missedCard: { borderColor: "#FFC58D" },
  icon: { width: 50, height: 50, borderRadius: 14, backgroundColor: "#F0F5FA", alignItems: "center", justifyContent: "center" },
  iconText: { color: colors.navy, fontSize: 23 },
  details: { flex: 1, gap: 7 },
  medicationSummary: { gap: 7 },
  nameRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", gap: spacing.sm },
  name: { flex: 1, color: colors.ink, fontSize: 17, fontWeight: "800" },
  dose: { color: colors.muted, fontWeight: "500" },
  status: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 999, overflow: "hidden", fontSize: 11, fontWeight: "800" },
  missedStatus: { color: colors.red, backgroundColor: "#FFF0F0" },
  trackStatus: { color: colors.green, backgroundColor: "#EFFAF1" },
  meta: { color: colors.muted, fontSize: 14 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: spacing.sm },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm },
  footer: { padding: spacing.lg, borderRadius: 19, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, marginTop: spacing.sm },
  footerText: { color: colors.muted, fontSize: 16, textAlign: "center" },
});
