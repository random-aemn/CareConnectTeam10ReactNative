import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../utils/theme";

export function AddMedicationScreen({ onOpenMeds }: { onOpenMeds: () => void }) {
  return (
    <View style={styles.addScreenWrap}>
      <View style={styles.addHeader}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back to medications" onPress={onOpenMeds} hitSlop={8}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.addTitle}>Add Medication</Text>
        <View style={styles.headerDots}>
          <Text style={styles.dotText}>•••</Text>
        </View>
      </View>

      <View style={styles.formTabs}>
        <View style={styles.tabStepComplete}>
          <Text style={styles.tabItemText}>✓</Text>
        </View>
        <View style={styles.tabStepActive}>
          <Text style={styles.tabStepLabel}>2</Text>
          <Text style={styles.tabStepText}>Schedule</Text>
        </View>
        <View style={styles.tabStep}>
          <Text style={styles.tabStepLabel}>3</Text>
          <Text style={styles.tabStepText}>Doctor</Text>
        </View>
        <View style={styles.tabStep}>
          <Text style={styles.tabStepLabel}>4</Text>
          <Text style={styles.tabStepText}>Review</Text>
        </View>
      </View>

      <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Medication details</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Medication</Text>
            <TextInput style={styles.inputBox} value="Lisinopril" placeholder="Medication name" placeholderTextColor={COLORS.muted} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Dosage</Text>
            <TextInput style={styles.inputBox} value="10 mg" placeholder="Dosage" placeholderTextColor={COLORS.muted} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Reminder Time(s)</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeChip}>
                <Text style={styles.timeChipText}>◔ 8:00 AM</Text>
                <Text style={styles.closeChip}>×</Text>
              </View>
              <Text style={styles.addTime}>+ Add time</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Provider & scheduling</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Prescribing Doctor</Text>
            <View style={styles.selectBox}>
              <Text style={styles.selectText}>Dr. Sarah Chen</Text>
              <Text style={styles.caret}>▾</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Start Date</Text>
            <View style={styles.selectBox}>
              <Text style={styles.selectText}>09/11/2026</Text>
              <Text style={styles.calendarIcon}>▣</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Refill Date</Text>
            <View style={styles.selectBox}>
              <Text style={styles.selectText}>09/14/2026</Text>
              <Text style={styles.calendarIcon}>▣</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Pharmacy / Notes</Text>
            <View style={styles.textBox}>
              <Text style={styles.textBoxText}>e.g. CVS on Main St.</Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Instructions</Text>
            <View style={styles.textBox}>
              <Text style={styles.textBoxText}>Take with food and water...</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Save medication"
        style={styles.saveButton}
        onPress={onOpenMeds}
      >
        <Text style={styles.saveButtonText}>✓ Save Medication</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addScreenWrap: {
    flex: 1,
    backgroundColor: "#edf2f6",
  },
  addHeader: {
    backgroundColor: "#1f3557",
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 34,
    lineHeight: 34,
    width: 28,
    textAlign: "center",
  },
  addTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "700",
    flex: 1,
  },
  headerDots: {
    alignItems: "center",
    justifyContent: "center",
  },
  dotText: {
    color: COLORS.white,
    fontSize: 20,
    letterSpacing: 1,
  },
  formTabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1f3557",
    paddingHorizontal: 18,
    paddingBottom: 12,
    gap: 10,
  },
  tabStepComplete: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2d9a73",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  tabItemText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  tabStep: {
    flex: 1,
    alignItems: "center",
    opacity: 0.72,
  },
  tabStepActive: {
    flex: 1,
    alignItems: "center",
  },
  tabStepLabel: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.18)",
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 22,
    fontSize: 11,
    fontWeight: "700",
  },
  tabStepText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    marginTop: 4,
  },
  formScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 86,
  },
  cardSection: {
    backgroundColor: "#f6f8fa",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dfe7ef",
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputBox: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: COLORS.text,
    fontSize: 14,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    height: 40,
  },
  timeChipText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  closeChip: {
    color: COLORS.muted,
    fontSize: 18,
  },
  addTime: {
    color: COLORS.blue,
    fontSize: 14,
    fontWeight: "600",
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f9fafb",
    height: 40,
  },
  selectText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
  },
  caret: {
    color: COLORS.muted,
    fontSize: 18,
  },
  calendarIcon: {
    color: COLORS.muted,
    fontSize: 18,
  },
  textBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 46,
  },
  textBoxText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  saveButton: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 16,
    backgroundColor: "#1f3557",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(31, 53, 87, 0.16)",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
