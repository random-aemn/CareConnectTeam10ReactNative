import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/theme";

const destinations = [
  { label: "Home", route: "/", glyph: "⌂" },
  { label: "Appts", route: "/appointments", glyph: "▣" },
  { label: "Meds", route: "/medications", glyph: "✚" },
  { label: "Inbox", route: "/inbox", glyph: "□" },
] as const;

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bar} accessibilityRole="tablist" accessibilityLabel="Primary navigation">
      {destinations.map((destination) => {
        const selected = pathname === destination.route;
        return (
          <Pressable
            key={destination.route}
            accessible
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={destination.label}
            accessibilityHint={`Navigates to the ${destination.label} screen`}
            onPress={() => router.replace(destination.route as "/")}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <View style={[styles.iconWrap, selected && styles.selectedIconWrap]}>
              <Text style={[styles.glyph, selected && styles.selectedGlyph]}>{destination.glyph}</Text>
            </View>
            <Text selectable style={[styles.label, selected && styles.selectedLabel]}>
              {destination.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 78,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: { flex: 1, minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", gap: 3 },
  iconWrap: { minWidth: 48, minHeight: 30, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  selectedIconWrap: { backgroundColor: "#EAF1FB" },
  glyph: { color: colors.muted, fontSize: 20, lineHeight: 23 },
  selectedGlyph: { color: colors.navy },
  label: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  selectedLabel: { color: colors.navy },
  pressed: { opacity: 0.65 },
});
