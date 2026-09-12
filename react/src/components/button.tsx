import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = ComponentProps<typeof Pressable> & {
  label: string;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <Pressable {...props}>
      <Text>{label}</Text>
    </Pressable>
  );
}
