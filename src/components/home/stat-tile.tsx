import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../utils/theme";

export function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "orange" | "navy";
}) {
  const background =
    tone === "blue" ? styles.blueTile : tone === "orange" ? styles.orangeTile : styles.navyTile;

  return (
    <View style={[styles.statTile, background]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statTile: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 76,
    justifyContent: "center",
  },
  blueTile: {
    backgroundColor: COLORS.blue,
  },
  orangeTile: {
    backgroundColor: COLORS.orange,
  },
  navyTile: {
    backgroundColor: COLORS.navyLight,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
    lineHeight: 34,
  },
  statLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 4,
  },
});
