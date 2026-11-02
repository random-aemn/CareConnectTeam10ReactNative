import { forwardRef, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, type View } from "react-native";

import { colors } from "@/theme";

type AppButtonProps = {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary" | "quiet";
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
};

export const AppButton = forwardRef<View, AppButtonProps>(function AppButton({
  label,
  icon,
  onPress,
  variant = "primary",
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
}: AppButtonProps, ref) {
  return (
    <Pressable
      ref={ref}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint ?? `Activates ${label.toLowerCase()}`}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "quiet" && styles.quiet,
        disabled && styles.disabled,
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
});

const styles = StyleSheet.create({
  base: {
    minWidth: 44,
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
  secondary: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.muted },
  quiet: { paddingHorizontal: 8 },
  label: { flexShrink: 1, textAlign: "center", fontSize: 15, fontWeight: "700" },
  primaryLabel: { color: colors.white },
  secondaryLabel: { color: colors.navy },
  quietLabel: { color: colors.muted },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.5 },
});
