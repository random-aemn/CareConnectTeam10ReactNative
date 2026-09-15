import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../utils/theme";

export function AppointmentRow({
  doctor,
  time,
  type,
  typeTone,
  compact = false,
}: {
  doctor: string;
  time: string;
  type: string;
  typeTone: "green" | "purple" | "blue" | "orange";
  compact?: boolean;
}) {
  const tagStyle =
    typeTone === "green"
      ? styles.greenBadge
      : typeTone === "purple"
        ? styles.purpleBadge
        : typeTone === "orange"
          ? styles.orangeBadge
          : styles.blueBadge;

  return (
    <View style={[styles.appointmentRow, compact && styles.compactAppointmentRow]}>
      <Text style={styles.rowIcon}>◔</Text>
      <View style={styles.appointmentTextWrap}>
        <Text style={[styles.doctorName, compact && styles.compactDoctorName]}>{doctor}</Text>
        <Text style={[styles.timeText, compact && styles.compactTimeText]}>{time}</Text>
      </View>
      {type ? (
        <View style={[styles.typeBadge, tagStyle]}>
          <Text style={styles.typeBadgeText}>{type}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function MissedDoseRow({
  name,
  schedule,
  status,
  compact = false,
}: {
  name: string;
  schedule: string;
  status: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.missedRow, compact && styles.compactMissedRow]}>
      <Text style={styles.rowIcon}>◔</Text>
      <View style={styles.missedTextWrap}>
        <Text style={[styles.missedName, compact && styles.compactMissedName]}>{name}</Text>
        <Text style={[styles.missedSchedule, compact && styles.compactMissedSchedule]}>{schedule}</Text>
      </View>
      <View style={styles.missedTag}>
        <Text style={styles.missedTagText}>{status}</Text>
      </View>
    </View>
  );
}

export function MedicationCard({
  name,
  schedule,
  by,
  refill,
  status,
  statusTone,
  buttonText,
  buttonTone,
}: {
  name: string;
  schedule: string;
  by: string;
  refill: string;
  status: string;
  statusTone: "red" | "green";
  buttonText: string;
  buttonTone: "navy" | "light";
}) {
  const pillStyle = statusTone === "red" ? styles.missedBadge : styles.onTrackBadge;

  return (
    <View style={styles.medicationCard}>
      <View style={styles.medRowTop}>
        <Text style={styles.medIcon}>◔</Text>
        <Text style={styles.medName}>{name}</Text>
        <View style={[styles.medStatus, pillStyle]}>
          <Text style={styles.medStatusText}>{status}</Text>
        </View>
      </View>

      <Text style={styles.medSchedule}>{schedule}</Text>

      <View style={styles.medMetaRow}>
        <Text style={styles.medMeta}>By: {by.split(": ")[1] ?? by}</Text>
        <Text style={styles.medMeta}>Refill: {refill.replace("Refill: ", "")}</Text>
      </View>

      <View style={styles.cardActionRow}>
        <View style={[styles.medActionButton, buttonTone === "navy" ? styles.primaryAction : styles.secondaryAction]}>
          <Text style={[styles.actionButtonText, buttonTone === "navy" ? styles.primaryActionText : styles.secondaryActionText]}>
            {buttonText}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appointmentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  compactAppointmentRow: {
    paddingVertical: 8,
  },
  rowIcon: {
    color: COLORS.text,
    fontSize: 16,
    width: 16,
    textAlign: "center",
  },
  appointmentTextWrap: {
    flex: 1,
  },
  doctorName: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: "600",
  },
  compactDoctorName: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 3,
  },
  compactTimeText: {
    fontSize: 12,
  },
  typeBadge: {
    minWidth: 78,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.text,
  },
  greenBadge: {
    backgroundColor: "#dff3e4",
  },
  purpleBadge: {
    backgroundColor: "#eae0f8",
  },
  orangeBadge: {
    backgroundColor: "#f4d9c3",
  },
  blueBadge: {
    backgroundColor: "#dcecfb",
  },
  missedRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4fb",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e4d1c3",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  compactMissedRow: {
    paddingVertical: 8,
  },
  missedTextWrap: {
    flex: 1,
  },
  missedName: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },
  compactMissedName: {
    fontSize: 15,
  },
  missedSchedule: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  compactMissedSchedule: {
    fontSize: 11,
  },
  missedTag: {
    backgroundColor: "#f7d7d7",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  missedTagText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "700",
  },
  medicationCard: {
    backgroundColor: "#f5f7fa",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ecb88a",
    padding: 14,
  },
  medRowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  medIcon: {
    color: COLORS.text,
    fontSize: 18,
    width: 18,
    textAlign: "center",
  },
  medName: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "600",
  },
  medStatus: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  medStatusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  missedBadge: {
    backgroundColor: "#f7d8d8",
  },
  onTrackBadge: {
    backgroundColor: "#dfeee0",
  },
  medSchedule: {
    color: COLORS.text,
    fontSize: 15,
    marginTop: 8,
    marginLeft: 22,
  },
  medMetaRow: {
    marginTop: 8,
    marginLeft: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medMeta: {
    color: COLORS.muted,
    fontSize: 12,
  },
  cardActionRow: {
    marginTop: 14,
    marginLeft: 22,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  medActionButton: {
    minWidth: 120,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryAction: {
    backgroundColor: COLORS.navyDark,
  },
  secondaryAction: {
    backgroundColor: "#edf3fb",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  primaryActionText: {
    color: COLORS.white,
  },
  secondaryActionText: {
    color: COLORS.text,
  },
});
