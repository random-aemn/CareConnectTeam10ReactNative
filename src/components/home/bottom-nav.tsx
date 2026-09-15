import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, type NavItem } from "../../utils/theme";

export function BottomNav({ active, onPress }: { active: string; onPress: (item: NavItem) => void }) {
  return (
    <View style={styles.bottomNav}>
      <Pressable accessibilityRole="button" accessibilityLabel="Home" style={styles.navItem} onPress={() => onPress("Home")}>
        <Text style={[styles.navIcon, active === "Home" && styles.navActiveIcon]}>⌂</Text>
        <Text style={[styles.navLabel, active === "Home" && styles.navActiveLabel]}>Home</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Apps" style={styles.navItem} onPress={() => onPress("Apps")}>
        <Text style={[styles.navIcon, active === "Apps" && styles.navActiveIcon]}>🗓</Text>
        <Text style={[styles.navLabel, active === "Apps" && styles.navActiveLabel]}>Apps</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Meds" style={styles.navItem} onPress={() => onPress("Meds")}>
        <Text style={[styles.navIcon, active === "Meds" && styles.navActiveIcon]}>💊</Text>
        <Text style={[styles.navLabel, active === "Meds" && styles.navActiveLabel]}>Meds</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Inbox" style={styles.navItem} onPress={() => onPress("Inbox")}>
        <Text style={[styles.navIcon, active === "Inbox" && styles.navActiveIcon]}>✉</Text>
        <Text style={[styles.navLabel, active === "Inbox" && styles.navActiveLabel]}>Inbox</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: "#f6f8fb",
    borderTopWidth: 1,
    borderTopColor: "#dfe7ef",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  navIcon: {
    fontSize: 24,
    color: COLORS.muted,
  },
  navActiveIcon: {
    color: COLORS.navy,
  },
  navLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },
  navActiveLabel: {
    color: COLORS.navy,
    fontWeight: "700",
  },
});
