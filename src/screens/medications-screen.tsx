import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { MedicationCard } from "../components/home/rows";
import { COLORS } from "../utils/theme";

export function MedicationsScreen({ onOpenAdd }: { onOpenAdd: () => void }) {
  return (
    <View style={styles.medicationsScreen}>
      <View style={styles.screenTitleWrap}>
        <Text style={styles.medTitle}>Medications</Text>
        <Text style={styles.subTitle}>Your active prescriptions</Text>
      </View>

      <ScrollView style={styles.medScroll} contentContainerStyle={styles.medContent} showsVerticalScrollIndicator={false}>
        <MedicationCard
          name="Lisinopril 10 mg"
          schedule="Once daily • 8:00 AM"
          by="By: Chen"
          refill="Refill: Sep 14, 2026"
          status="Missed"
          statusTone="red"
          buttonText="Mark taken"
          buttonTone="navy"
        />
        <MedicationCard
          name="Metformin 500 mg"
          schedule="Twice daily • 8:00 AM, 8:00 PM"
          by="By: Nair"
          refill="Refill: Sep 22, 2026"
          status="Missed"
          statusTone="red"
          buttonText="Mark taken"
          buttonTone="navy"
        />
        <MedicationCard
          name="Atorvastatin 20 mg"
          schedule="Once daily (evening) • 9:00 PM"
          by="By: Webb"
          refill="Refill: Oct 3, 2026"
          status="On track"
          statusTone="green"
          buttonText="Refill"
          buttonTone="light"
        />
        <MedicationCard
          name="Vitamin D3 2000 IU"
          schedule="Once daily • 8:00 AM"
          by="By: Chen"
          refill="Refill: Nov 1, 2026"
          status="On track"
          statusTone="green"
          buttonText="Refill"
          buttonTone="light"
        />
      </ScrollView>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add medication"
        style={styles.addMedicationButton}
        onPress={onOpenAdd}
      >
        <Text style={styles.addMedicationText}>+  Add Medication</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  medicationsScreen: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
  },
  screenTitleWrap: {
    backgroundColor: COLORS.navy,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  medTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "700",
  },
  subTitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    marginTop: 4,
  },
  medScroll: {
    flex: 1,
    marginTop: 18,
    marginBottom: 98,
  },
  medContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 14,
  },
  addMedicationButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 84,
    backgroundColor: COLORS.navy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addMedicationText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
