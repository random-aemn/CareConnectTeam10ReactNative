import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { colors, spacing } from "@/theme";

const appointments = [
  { provider: "Dr. Sarah Chen", specialty: "Primary Care", date: "Tue, Sep 1 · 12:20 AM", location: "Northside Medical Center, Suite 210", telehealth: false, timeAway: "~4h away" },
  { provider: "Dr. Marcus Webb", specialty: "Cardiology", date: "Tue, Sep 1 · 6:20 PM", location: "Telehealth - Video Call", telehealth: true, timeAway: "~22h away" },
  { provider: "Dr. Priya Nair", specialty: "Endocrinology", date: "Sat, Sep 5 · 8:20 PM", location: "Westfield Health Pavilion, Room 114", telehealth: false },
];

export default function AppointmentsScreen() {
  const [requestVisible, setRequestVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={styles.header}>
          <View style={[styles.titleRow, wide && styles.wideTitleRow]}>
            <Text selectable style={styles.title}>Appointments</Text>
            <AppButton label="Request Appointment" icon={<Text style={styles.buttonIcon}>＋</Text>} onPress={() => setRequestVisible(true)} />
          </View>
          <View style={styles.segmented} accessibilityRole="tablist">
            <View style={styles.activeSegment}><Text selectable style={styles.activeSegmentText}>Upcoming</Text></View>
            <Text selectable style={styles.inactiveSegment}>Past</Text>
          </View>
        </View>
        <View style={[styles.cards, wide && styles.wideCards]}>
          {appointments.map((appointment) => <AppointmentCard key={appointment.provider} appointment={appointment} wide={wide} />)}
        </View>
      </ScrollView>
      <BottomNav />
      <AppointmentRequestModal visible={requestVisible} wide={wide} onClose={() => setRequestVisible(false)} />
    </View>
  );
}

type Appointment = (typeof appointments)[number];

function AppointmentCard({ appointment, wide }: { appointment: Appointment; wide: boolean }) {
  return (
    <View style={[styles.card, wide && styles.wideCard]} accessibilityLabel={`${appointment.provider}, ${appointment.specialty}`}>
      {appointment.timeAway && <Text selectable style={styles.timeAway}>• {appointment.timeAway}</Text>}
      <View style={styles.cardMain}>
        <View style={styles.cardIcon}><Text style={styles.cardIconText}>{appointment.telehealth ? "◉" : "▣"}</Text></View>
        <View style={styles.flex}>
          <Text selectable style={styles.provider}>{appointment.provider}</Text>
          <Text selectable style={styles.specialty}>{appointment.specialty}</Text>
          <Text selectable style={styles.meta}>◷ {appointment.date}</Text>
          <Text selectable style={styles.meta}>⌖ {appointment.location}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <AppButton label="Reschedule" onPress={() => {}} variant="secondary" accessibilityLabel={`Reschedule appointment with ${appointment.provider}`} />
        <AppButton label="Cancel" onPress={() => {}} variant="secondary" accessibilityLabel={`Cancel appointment with ${appointment.provider}`} />
        {appointment.telehealth && <AppButton label="Join" onPress={() => {}} accessibilityLabel={`Join telehealth appointment with ${appointment.provider}`} />}
      </View>
    </View>
  );
}

function AppointmentRequestModal({ visible, wide, onClose }: { visible: boolean; wide: boolean; onClose: () => void }) {
  const [provider, setProvider] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function submitRequest() {
    const missing = [
      !provider && "Medical provider",
      !date && "Preferred date",
      !startTime && "Start time",
      !endTime && "End time",
    ].filter(Boolean) as string[];
    setErrors(missing);
    if (missing.length === 0) onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.modalBackdrop, wide && styles.wideModalBackdrop]}>
        <View style={[styles.modalCard, wide && styles.wideModalCard]} accessibilityViewIsModal>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text selectable style={styles.modalTitle}>Request an appointment</Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Close appointment request" onPress={onClose} hitSlop={12}>
                <Text style={styles.close}>×</Text>
              </Pressable>
            </View>
            <Text selectable style={styles.requiredHint}>Fields marked required must be completed.</Text>
            <FieldLabel label="Medical provider (required)" />
            <TextInput accessibilityLabel="Medical provider, required" placeholder="Select a provider" value={provider} onChangeText={setProvider} style={styles.input} />
            <FieldLabel label="Preferred date (required)" />
            <TextInput accessibilityLabel="Preferred date, required" placeholder="MM/DD/YYYY" value={date} onChangeText={setDate} style={styles.input} />
            <View style={styles.timeRow}>
              <View style={styles.timeField}><FieldLabel label="Start time (required)" /><TextInput accessibilityLabel="Start time, required" placeholder="9:00 AM" value={startTime} onChangeText={setStartTime} style={styles.input} /></View>
              <View style={styles.timeField}><FieldLabel label="End time (required)" /><TextInput accessibilityLabel="End time, required" placeholder="10:00 AM" value={endTime} onChangeText={setEndTime} style={styles.input} /></View>
            </View>
            <FieldLabel label="Additional information (optional)" />
            <TextInput accessibilityLabel="Additional information, optional" placeholder="Tell us anything the care team should know" value={summary} onChangeText={setSummary} multiline numberOfLines={4} style={[styles.input, styles.summaryInput]} />
            <AppButton label="Attach document (optional)" icon={<Text style={styles.buttonIcon}>⌕</Text>} onPress={() => {}} variant="secondary" accessibilityLabel="Attach an optional document" />
            {errors.length > 0 && <Text selectable accessibilityRole="alert" style={styles.error}>Please complete: {errors.join(", ")}</Text>}
            <View style={styles.modalActions}>
              <AppButton label="Cancel" onPress={onClose} variant="secondary" accessibilityLabel="Cancel appointment request" />
              <AppButton label="Submit request" onPress={submitRequest} accessibilityLabel="Submit appointment request" />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text selectable style={styles.fieldLabel}>{label}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 32, width: "100%" },
  wideContent: { alignSelf: "center", maxWidth: 980 },
  header: { gap: spacing.lg },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  wideTitleRow: { alignItems: "flex-start" },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800", flex: 1 },
  buttonIcon: { fontSize: 18, color: colors.white },
  segmented: { padding: 5, backgroundColor: "#F0F2F8", borderRadius: 16, flexDirection: "row", alignItems: "center" },
  cards: { gap: spacing.md },
  wideCards: { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
  activeSegment: { flex: 1, backgroundColor: colors.navy, borderRadius: 12, paddingVertical: 13, alignItems: "center" },
  activeSegmentText: { color: colors.white, fontWeight: "700" },
  inactiveSegment: { flex: 1, color: colors.muted, fontSize: 15, fontWeight: "700", textAlign: "center" },
  card: { padding: spacing.md, backgroundColor: colors.surface, borderRadius: 19, borderWidth: 1, borderColor: "#BDD7FF", gap: spacing.md },
  wideCard: { flexGrow: 1, flexBasis: "46%", minWidth: 320 },
  timeAway: { color: "#2E64E8", fontWeight: "800" },
  cardMain: { flexDirection: "row", gap: spacing.md },
  cardIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: "#F0F6FF", alignItems: "center", justifyContent: "center" },
  cardIconText: { color: "#2962E8", fontSize: 22 },
  flex: { flex: 1 },
  provider: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  specialty: { color: colors.muted, fontSize: 14, marginTop: 2 },
  meta: { color: colors.muted, fontSize: 14, marginTop: 9 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(15, 28, 46, 0.42)" },
  wideModalBackdrop: { justifyContent: "center", alignItems: "center" },
  modalCard: { width: "100%", maxHeight: "92%", backgroundColor: colors.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, borderCurve: "continuous" },
  wideModalCard: { width: "92%", maxWidth: 680, alignSelf: "center", borderRadius: 26 },
  modalContent: { padding: spacing.lg, gap: spacing.sm },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm },
  modalTitle: { color: colors.ink, fontSize: 23, fontWeight: "800" },
  close: { color: colors.muted, fontSize: 32, lineHeight: 32 },
  requiredHint: { color: colors.muted, fontSize: 13, marginBottom: spacing.sm },
  fieldLabel: { color: colors.ink, fontSize: 14, fontWeight: "700", marginTop: spacing.sm },
  input: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, color: colors.ink, fontSize: 15, backgroundColor: "#FCFDFE" },
  timeRow: { flexDirection: "row", gap: spacing.sm },
  timeField: { flex: 1 },
  summaryInput: { minHeight: 105, textAlignVertical: "top" },
  error: { color: colors.red, fontWeight: "700", paddingVertical: spacing.sm },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.md },
});
