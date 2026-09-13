import { fireEvent, render, screen } from "@testing-library/react-native";

import { AppButton } from "./app-button";

describe("AppButton", () => {
  it("calls its action when the user presses it", async () => {
    const onPress = jest.fn();

    await render(<AppButton label="Save changes" onPress={onPress} />);
    await fireEvent.press(screen.getByRole("button", { name: "Save changes" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});