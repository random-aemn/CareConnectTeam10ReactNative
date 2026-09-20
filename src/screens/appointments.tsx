import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, findNodeHandle, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { colors, spacing } from "@/theme";

const appointments = [
  { provider: "Dr. Sarah Chen", specialty: "Primary Care", date: "Tue, Sep 1 · 12:20 AM", location: "Northside Medical Center, Suite 210", telehealth: false, timeAway: "Approximately 4 hours away" },
  { provider: "Dr. Marcus Webb", specialty: "Cardiology", date: "Tue, Sep 1 · 6:20 PM", location: "Telehealth - Video Call", telehealth: true, timeAway: "Approximately 22 hours away" },
  { provider: "Dr. Priya Nair", specialty: "Endocrinology", date: "Sat, Sep 5 · 8:20 PM", location: "Westfield Health Pavilion, Room 114", telehealth: false },
];

export default function AppointmentsScreen() {
  const [requestVisible, setRequestVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const requestButtonRef = useRef<View>(null);
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  function closeRequest() {
    setRequestVisible(false);
    setTimeout(() => {
      const node = findNodeHandle(requestButtonRef.current);
      if (node) AccessibilityInfo.setAccessibilityFocus(node);
    }, 150);
  }

  function completeRequest() {
    closeRequest();
    setTimeout(() => AccessibilityInfo.announceForAccessibility("Appointment request submitted"), 350);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={styles.header}>
          <View style={[styles.titleRow, wide && styles.wideTitleRow]}>
            <Text selectable accessibilityRole="header" style={styles.title}>Appointments</Text>
            <AppButton ref={requestButtonRef} label="Request Appointment" icon={<Text accessible={false} style={styles.buttonIcon}>＋</Text>} onPress={() => setRequestVisible(true)} accessibilityHint="Opens the appointment request form" />
          </View>
          <View style={styles.segmented} accessibilityRole="tablist">
            {(["upcoming", "past"] as const).map((tab) => {
              const selected = activeTab === tab;
              const label = tab === "upcoming" ? "Upcoming" : "Past";
              return <Pressable key={tab} accessible accessibilityRole="tab" accessibilityLabel={label} accessibilityHint={`Shows ${label.toLowerCase()} appointments`} accessibilityState={{ selected }} onPress={() => setActiveTab(tab)} style={[styles.segment, selected && styles.activeSegment]}><Text selectable style={selected ? styles.activeSegmentText : styles.inactiveSegment}>{label}</Text></Pressable>;
            })}
          </View>
        </View>
        <View style={[styles.cards, wide && styles.wideCards]}>
          {activeTab === "upcoming" ? appointments.map((appointment) => <AppointmentCard key={appointment.provider} appointment={appointment} wide={wide} />) : <Text accessible accessibilityRole="summary" style={styles.emptyState}>No past appointments.</Text>}
        </View>
      </ScrollView>
      <BottomNav />
      <AppointmentRequestModal visible={requestVisible} wide={wide} onClose={closeRequest} onSubmitted={completeRequest} />
    </View>
  );
}

type Appointment = (typeof appointments)[number];

function AppointmentCard({ appointment, wide }: { appointment: Appointment; wide: boolean }) {
  return (
    <View style={[styles.card, wide && styles.wideCard]}>
      {appointment.timeAway && <Text accessible={false} selectable style={styles.timeAway}>• {appointment.timeAway}</Text>}
      <View style={styles.cardMain} accessible accessibilityRole="summary" accessibilityLabel={`${appointment.provider}, ${appointment.specialty}, ${appointment.date}, ${appointment.location}${appointment.timeAway ? `, ${appointment.timeAway}` : ""}`}>
        <View accessible={false} importantForAccessibility="no-hide-descendants" style={styles.cardIcon}><Text style={styles.cardIconText}>{appointment.telehealth ? "◉" : "▣"}</Text></View>
        <View style={styles.flex}>
          <Text selectable style={styles.provider}>{appointment.provider}</Text>
          <Text selectable style={styles.specialty}>{appointment.specialty}</Text>
          <Text selectable style={styles.meta}>◷ {appointment.date}</Text>
          <Text selectable style={styles.meta}>⌖ {appointment.location}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <AppButton label="Reschedule" onPress={() => {}} variant="secondary" accessibilityLabel={`Reschedule appointment with ${appointment.provider}`} accessibilityHint="Opens rescheduling options" />
        <AppButton label="Cancel" onPress={() => {}} variant="secondary" accessibilityLabel={`Cancel appointment with ${appointment.provider}`} accessibilityHint="Opens appointment cancellation" />
        {appointment.telehealth && <AppButton label="Join" onPress={() => {}} accessibilityLabel={`Join telehealth appointment with ${appointment.provider}`} accessibilityHint="Joins the video appointment" />}
      </View>
    </View>
  );
}

function AppointmentRequestModal({ visible, wide, onClose, onSubmitted }: { visible: boolean; wide: boolean; onClose: () => void; onSubmitted: () => void }) {
  const [provider, setProvider] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<Text>(null);
  const providerRef = useRef<TextInput>(null);
  const dateRef = useRef<TextInput>(null);
  const startTimeRef = useRef<TextInput>(null);
  const endTimeRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const node = findNodeHandle(titleRef.current);
      if (node) AccessibilityInfo.setAccessibilityFocus(node);
    }, 350);
    return () => clearTimeout(timer);
  }, [visible]);

  function submitRequest() {
    const missing = [
      !provider && "Medical provider",
      !date && "Preferred date",
      !startTime && "Start time",
      !endTime && "End time",
    ].filter(Boolean) as string[];
    setErrors(missing);
    if (missing.length === 0) onSubmitted();
    else {
      AccessibilityInfo.announceForAccessibility(`Please complete: ${missing.join(", ")}`);
      const firstInvalidField = {
        "Medical provider": providerRef,
        "Preferred date": dateRef,
        "Start time": startTimeRef,
        "End time": endTimeRef,
      }[missing[0]];
      firstInvalidField?.current?.focus();
    }
  }

  return (
    <Modal visible={visible} animationType={reducedMotion ? "none" : "slide"} transparent onRequestClose={onClose}>
      <View style={[styles.modalBackdrop, wide && styles.wideModalBackdrop]}>
        <View style={[styles.modalCard, wide && styles.wideModalCard]} accessible={false} accessibilityViewIsModal importantForAccessibility="yes">
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text ref={titleRef} accessible accessibilityRole="header" selectable style={styles.modalTitle}>Request an appointment</Text>
              <Pressable accessible accessibilityRole="button" accessibilityLabel="Close appointment request" accessibilityHint="Closes the form without submitting" onPress={onClose} style={styles.closeButton}>
                <Text accessible={false} style={styles.close}>×</Text>
              </Pressable>
            </View>
            <Text selectable style={styles.requiredHint}>Fields marked required must be completed.</Text>
            <FieldLabel id="provider-label" label="Medical provider (required)" />
            <TextInput ref={providerRef} accessible accessibilityLabel="Medical provider, required" accessibilityLabelledBy="provider-label" accessibilityHint="Enter the provider for this appointment" aria-invalid={errors.includes("Medical provider")} placeholder="Select a provider" placeholderTextColor={colors.muted} value={provider} onChangeText={setProvider} style={styles.input} />
            <FieldLabel id="date-label" label="Preferred date (required)" />
            <TextInput ref={dateRef} accessible accessibilityLabel="Preferred date, required" accessibilityLabelledBy="date-label" accessibilityHint="Enter a date in month, day, year format" aria-invalid={errors.includes("Preferred date")} placeholder="MM/DD/YYYY" placeholderTextColor={colors.muted} keyboardType="numbers-and-punctuation" value={date} onChangeText={setDate} style={styles.input} />
            <View style={styles.timeRow}>
              <View style={styles.timeField}><FieldLabel id="start-time-label" label="Start time (required)" /><TextInput ref={startTimeRef} accessible accessibilityLabel="Start time, required" accessibilityLabelledBy="start-time-label" accessibilityHint="Enter the preferred appointment start time" aria-invalid={errors.includes("Start time")} placeholder="9:00 AM" placeholderTextColor={colors.muted} value={startTime} onChangeText={setStartTime} style={styles.input} /></View>
              <View style={styles.timeField}><FieldLabel id="end-time-label" label="End time (required)" /><TextInput ref={endTimeRef} accessible accessibilityLabel="End time, required" accessibilityLabelledBy="end-time-label" accessibilityHint="Enter the preferred appointment end time" aria-invalid={errors.includes("End time")} placeholder="10:00 AM" placeholderTextColor={colors.muted} value={endTime} onChangeText={setEndTime} style={styles.input} /></View>
            </View>
            <FieldLabel id="summary-label" label="Additional information (optional)" />
            <TextInput accessible accessibilityLabel="Additional information, optional" accessibilityLabelledBy="summary-label" accessibilityHint="Enter details for the care team" placeholder="Tell us anything the care team should know" placeholderTextColor={colors.muted} value={summary} onChangeText={setSummary} multiline numberOfLines={4} style={[styles.input, styles.summaryInput]} />
            <AppButton label="Attach document (optional)" icon={<Text accessible={false} style={styles.secondaryButtonIcon}>⌕</Text>} onPress={() => {}} variant="secondary" accessibilityLabel="Attach an optional document" accessibilityHint="Opens the document picker" />
            {errors.length > 0 && <Text accessible selectable accessibilityRole="alert" accessibilityLiveRegion="assertive" style={styles.error}>Please complete: {errors.join(", ")}</Text>}
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

function FieldLabel({ id, label }: { id: string; label: string }) {
  return <Text nativeID={id} selectable style={styles.fieldLabel}>{label}</Text>;
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
  secondaryButtonIcon: { fontSize: 18, color: colors.navy },
  segmented: { padding: 5, backgroundColor: "#F0F2F8", borderRadius: 16, flexDirection: "row", alignItems: "center" },
  cards: { gap: spacing.md },
  wideCards: { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
  segment: { flex: 1, minHeight: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  activeSegment: { backgroundColor: colors.navy },
  activeSegmentText: { color: colors.white, fontSize: 15, fontWeight: "700", textAlign: "center" },
  inactiveSegment: { color: colors.navy, fontSize: 15, fontWeight: "700", textAlign: "center" },
  emptyState: { color: colors.muted, fontSize: 16, padding: spacing.lg, textAlign: "center" },
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
  closeButton: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
  requiredHint: { color: colors.muted, fontSize: 13, marginBottom: spacing.sm },
  fieldLabel: { color: colors.ink, fontSize: 14, fontWeight: "700", marginTop: spacing.sm },
  input: { minHeight: 48, borderWidth: 2, borderColor: colors.muted, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, color: colors.ink, fontSize: 15, backgroundColor: "#FCFDFE" },
  timeRow: { flexDirection: "row", gap: spacing.sm },
  timeField: { flex: 1 },
  summaryInput: { minHeight: 105, textAlignVertical: "top" },
  error: { color: colors.red, fontWeight: "700", paddingVertical: spacing.sm },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.md },
});
