import { fireEvent, render, screen } from "@testing-library/react-native";

import MedicationsScreen from "./medications";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/medications",
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("MedicationsScreen accessibility", () => {
  it("provides medication-specific action names and announces status updates", async () => {
    await render(<MedicationsScreen />);

    const markTaken = screen.getByRole("button", { name: "Mark Lisinopril as taken" });
    expect(markTaken).toHaveAccessibleName("Mark Lisinopril as taken");
    expect(markTaken).toHaveProp("accessibilityHint", "Updates this medication status to on track");

    await fireEvent.press(markTaken);
    expect(screen.getByLabelText("Lisinopril status: On track")).toHaveProp("accessibilityLiveRegion", "polite");
  });
});
