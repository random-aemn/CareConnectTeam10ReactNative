import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppointmentRow, MissedDoseRow } from "../components/home/rows";
import { StatTile } from "../components/home/stat-tile";
import { COLORS } from "../utils/theme";

export function HomeScreen({
  onOpenHighlights,
  onOpenMeds,
}: {
  onOpenHighlights: () => void;
  onOpenMeds: () => void;
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.headerNav}>
        <View style={styles.brandRow}>
          <View style={styles.logoBubble}>
            <Text style={styles.logoDot}>◉</Text>
          </View>
          <Text style={styles.brand}>CareConnect</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open highlights"
          style={styles.highlightsPill}
          onPress={onOpenHighlights}
        >
          <Text style={styles.highlightsIcon}>◌</Text>
          <Text style={styles.highlightsText}>Highlights</Text>
        </Pressable>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Jordan</Text>
        <Text style={styles.date}>Sun, Aug 30</Text>
      </View>

      <View style={styles.statsRow}>
        <StatTile label="Appointments" value="3" tone="blue" />
        <StatTile label="Meds" value="4" tone="orange" />
        <StatTile label="Unread" value="2" tone="navy" />
      </View>

      <View style={styles.cardSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🗓</Text>
          <Text style={styles.sectionText}>2 appointments in the next 24 hours</Text>
        </View>

        <View style={styles.appointmentList}>
          <AppointmentRow doctor="Dr. Sarah Chen" time="5:21 PM ~ 4h away" type="In-Person" typeTone="green" />
          <AppointmentRow doctor="Dr. Marcus Webb" time="11:21 AM ~ 22h away" type="Telehealth" typeTone="purple" />
        </View>
      </View>

      <View style={[styles.cardSection, styles.missedSection]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚠</Text>
          <Text style={styles.sectionText}>2 missed doses today</Text>
        </View>

        <View style={styles.appointmentList}>
          <MissedDoseRow name="Lisinopril 10 mg" schedule="8:00 AM • Once daily" status="Missed" />
          <MissedDoseRow name="Metformin 500 mg" schedule="8:00 AM, 8:00 PM • Twice daily" status="Missed" />
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f6f7",
  },
  headerNav: {
    backgroundColor: "#1d3557",
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 26,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  logoDot: {
    fontSize: 12,
    color: COLORS.white,
  },
  brand: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "700",
  },
  highlightsPill: {
    position: "absolute",
    right: 18,
    top: 18,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  highlightsIcon: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  highlightsText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  heroSection: {
    marginTop: 12,
    paddingHorizontal: 20,
  },
  greeting: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 18,
  },
  name: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 38,
  },
  date: {
    color: COLORS.muted,
    fontSize: 17,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    marginTop: 18,
  },
  cardSection: {
    marginTop: 18,
    backgroundColor: "#ecf1f5",
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#dfe7ef",
  },
  missedSection: {
    backgroundColor: "#f6eae1",
    borderColor: "#edd0ba",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },
  appointmentList: {
    gap: 10,
    marginTop: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
