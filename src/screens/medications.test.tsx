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

    const medicationCard = screen.getByRole("summary", { name: "Lisinopril, 10 mg, Once daily · 8:00 AM, prescribed by Doctor Chen, refill Sep 14, 2026, status missed" });
    expect(medicationCard).toHaveProp("accessible", true);
    expect(medicationCard).toHaveProp("accessibilityActions", [
      { name: "markTaken", label: "Mark taken" },
      { name: "refill", label: "Refill" },
    ]);

    const markTaken = screen.getByRole("button", { name: "Mark Lisinopril as taken" });
    expect(markTaken).toHaveAccessibleName("Mark Lisinopril as taken");
    expect(markTaken).toHaveProp("accessibilityHint", "Updates this medication status to on track");

    await fireEvent.press(markTaken);
    expect(screen.getByRole("summary", { name: "Lisinopril, 10 mg, Once daily · 8:00 AM, prescribed by Doctor Chen, refill Sep 14, 2026, status on track" })).toBeOnTheScreen();
  });
});
