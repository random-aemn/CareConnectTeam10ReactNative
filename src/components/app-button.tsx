import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/theme";

type AppButtonProps = {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary" | "quiet";
  accessibilityLabel?: string;
};

export function AppButton({
  label,
  icon,
  onPress,
  variant = "primary",
  accessibilityLabel,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "quiet" && styles.quiet,
        pressed && styles.pressed,
      ]}
    >
      {icon}
      <Text
        selectable
        style={[
          styles.label,
          variant === "primary" && styles.primaryLabel,
          variant === "secondary" && styles.secondaryLabel,
          variant === "quiet" && styles.quietLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderCurve: "continuous",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primary: { backgroundColor: colors.navy },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  quiet: { paddingHorizontal: 8 },
  label: { fontSize: 15, fontWeight: "700" },
  primaryLabel: { color: colors.white },
  secondaryLabel: { color: colors.navy },
  quietLabel: { color: colors.muted },
  pressed: { opacity: 0.75 },
});
