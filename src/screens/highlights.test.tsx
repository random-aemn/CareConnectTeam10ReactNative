import { render, screen } from "@testing-library/react-native";

import HighlightsScreen from "./highlights";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/highlights",
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("HighlightsScreen accessibility", () => {
  it("summarizes today's medications, messages, and appointments", async () => {
    await render(<HighlightsScreen />);

    expect(screen.getByRole("header", { name: "Today's Highlights" })).toBeOnTheScreen();
    expect(screen.getByRole("summary", { name: "Lisinopril, 10 mg, scheduled for 8:00 AM, status Missed" })).toBeOnTheScreen();
    expect(screen.getByRole("summary", { name: /Unread message from Dr. Sarah Chen/ })).toBeOnTheScreen();
    expect(screen.getByRole("summary", { name: "No appointments today." })).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: "Back to home" })).toHaveProp("accessibilityHint", "Returns to the Home screen");
  });
});
