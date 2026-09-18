import { render, screen } from "@testing-library/react-native";

import { Home } from ".";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe("Home accessibility", () => {
  it("exposes its heading, summaries, and selected navigation tab", async () => {
    await render(<Home />);

    expect(screen.getByRole("header", { name: /Good morning/ })).toBeOnTheScreen();
    expect(screen.getByLabelText("3 Appointments")).toBeOnTheScreen();
    expect(screen.getByRole("tab", { name: "Home" })).toBeSelected();
    expect(screen.getByRole("button", { name: "Highlights" })).toHaveProp("accessibilityHint", "Shows today's health highlights");
  });
});
