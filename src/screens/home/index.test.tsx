import { fireEvent, render, screen } from "@testing-library/react-native";

import { Home } from ".";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/",
  useRouter: () => ({ push: mockPush, replace: jest.fn() }),
}));

describe("Home accessibility", () => {
  it("exposes its heading, summaries, and selected navigation tab", async () => {
    await render(<Home />);

    expect(screen.getByRole("header", { name: /Good morning/ })).toBeOnTheScreen();
    expect(screen.getByLabelText("3 Appointments")).toBeOnTheScreen();
    expect(screen.getByLabelText("Dr. Sarah Chen, 12:20 AM, approximately 4 hours away, In-Person")).toBeOnTheScreen();
    expect(screen.getByRole("tab", { name: "Home" })).toBeSelected();
    expect(screen.getByRole("button", { name: "Highlights" })).toHaveProp("accessibilityHint", "Shows today's health highlights");
  });

  it("opens today's highlights", async () => {
    await render(<Home />);

    await fireEvent.press(screen.getByRole("button", { name: "Highlights" }));
    expect(mockPush).toHaveBeenCalledWith("/highlights");
  });
});
