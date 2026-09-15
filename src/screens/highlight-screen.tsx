import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppointmentRow, MissedDoseRow } from "../components/home/rows";
import { COLORS } from "../utils/theme";

export function HighlightsScreen({ onClose }: { onClose: () => void }) {
  return (
    <View style={styles.overlayWrap}>
      <View style={styles.overlayBackdrop} />
      <View style={styles.modalPanel}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Today&apos;s Highlights</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close highlights header" onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>

        <View style={styles.modalDateRow}>
          <Text style={styles.modalDate}>Sun, Aug 30</Text>
        </View>

        <View style={styles.modalSectionHeader}>
          <Text style={styles.sectionIcon}>🗓</Text>
          <Text style={styles.modalSectionLabel}>Appointments</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        <View style={styles.modalAlertBar}>
          <Text style={styles.alertDot}>•</Text>
          <Text style={styles.alertText}>2 appointments within 24 hours</Text>
        </View>

        <View style={styles.modalAppointments}>
          <AppointmentRow doctor="Dr. Sarah Chen" time="Sun, Aug 30 • 5:21 PM" type="In-Person" typeTone="green" compact />
          <AppointmentRow doctor="Dr. Marcus Webb" time="Mon, Aug 31 • 11:21 AM" type="Telehealth" typeTone="purple" compact />
          <AppointmentRow doctor="Dr. Priya Nair" time="Fri, Sep 4 • 1:21 PM" type="" typeTone="blue" compact />
        </View>

        <View style={styles.modalSectionHeader}>
          <Text style={styles.sectionIcon}>💊</Text>
          <Text style={styles.modalSectionLabel}>Medications</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        <View style={styles.modalAlertBarWarning}>
          <Text style={styles.warningDot}>⚠</Text>
          <Text style={styles.alertText}>2 missed doses today</Text>
        </View>

        <View style={styles.modalAppointments}>
          <MissedDoseRow name="Lisinopril 10 mg" schedule="8:00 AM" status="Missed" compact />
          <MissedDoseRow name="Metformin 500 mg" schedule="8:00 AM, 8:00 PM" status="Missed" compact />
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Close highlights" style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayWrap: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(17, 29, 52, 0.44)",
  },
  modalPanel: {
    width: 330,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
    position: "relative",
    elevation: 24,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
  },
  closeText: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 28,
    marginRight: 4,
  },
  modalDateRow: {
    marginTop: 6,
    marginBottom: 12,
  },
  modalDate: {
    color: COLORS.muted,
    fontSize: 13,
  },
  modalSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 15,
    width: 20,
  },
  modalSectionLabel: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  viewAll: {
    color: COLORS.blue,
    fontSize: 12,
    fontWeight: "700",
  },
  modalAlertBar: {
    backgroundColor: "#dfeefb",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalAlertBarWarning: {
    backgroundColor: "#f5e1d1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alertText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },
  alertDot: {
    color: COLORS.blue,
    fontSize: 16,
  },
  warningDot: {
    color: COLORS.orange,
    fontSize: 16,
  },
  modalAppointments: {
    marginTop: 8,
    gap: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#eef3f9",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  closeButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
});
