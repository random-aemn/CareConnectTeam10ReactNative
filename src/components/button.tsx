import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = ComponentProps<typeof Pressable> & {
  label: string;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <Pressable
      accessible
      accessibilityRole={props.accessibilityRole ?? "button"}
      accessibilityLabel={props.accessibilityLabel ?? label}
      accessibilityHint={props.accessibilityHint ?? `Activates ${label.toLowerCase()}`}
      {...props}
      style={(state) => [
        { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
        typeof props.style === "function" ? props.style(state) : props.style,
      ]}
    >
      <Text>{label}</Text>
    </Pressable>
  );
}
