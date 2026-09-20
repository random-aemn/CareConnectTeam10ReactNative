import { fireEvent, render, screen } from "@testing-library/react-native";

import { AppButton } from "./app-button";

describe("AppButton", () => {
  it("calls its action when the user presses it", async () => {
    const onPress = jest.fn();

    await render(<AppButton label="Save changes" onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button", { name: "Save changes" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("exposes an accessible name, hint, state, and minimum touch target", async () => {
    await render(<AppButton label="Save changes" onPress={() => {}} accessibilityHint="Saves the profile" />);

    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveAccessibleName("Save changes");
    expect(button).toHaveProp("accessible", true);
    expect(button).toHaveProp("accessibilityHint", "Saves the profile");
    expect(button).toBeEnabled();
    expect(button).toHaveStyle({ minWidth: 44, minHeight: 48 });
  });

  it("announces and enforces its disabled state", async () => {
    await render(<AppButton label="Save changes" onPress={() => {}} disabled />);

    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
  });
});
