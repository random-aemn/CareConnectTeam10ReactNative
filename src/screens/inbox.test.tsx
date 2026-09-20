import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

import InboxScreen from "./inbox";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/inbox",
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("InboxScreen", () => {
  it("creates a new provider message from the Inbox", async () => {
    jest.useFakeTimers();
    const announce = jest.spyOn(AccessibilityInfo, "announceForAccessibility").mockImplementation(() => undefined);
    await render(<InboxScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Create a new message" }));
    await fireEvent.press(screen.getByRole("radio", { name: "Dr. Priya Nair" }));
    await fireEvent.changeText(screen.getByPlaceholderText("Describe what you need help with"), "I have a question about my medication.");
    await fireEvent.press(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getAllByText("Dr. Priya Nair").length).toBeGreaterThan(0);
    expect(screen.getAllByText("I have a question about my medication.").length).toBeGreaterThan(0);
    await act(() => jest.runAllTimers());
    expect(announce).toHaveBeenCalledWith("Message sent to Dr. Priya Nair");
    announce.mockRestore();
    jest.useRealTimers();
  });

  it("lets the patient reply in an existing thread", async () => {
    await render(<InboxScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Open conversation with Dr. Sarah Chen" }));
    await fireEvent.changeText(screen.getByPlaceholderText("Write a reply..."), "Thank you for the update.");
    await fireEvent.press(screen.getByRole("button", { name: "Send reply" }));

    expect(screen.getAllByText("Thank you for the update.").length).toBeGreaterThan(0);
  });

  it("requires a provider and message before sending", async () => {
    await render(<InboxScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Create a new message" }));
    await fireEvent.press(screen.getByRole("button", { name: "Send message" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Choose a provider and enter a message to continue.");
    expect(alert).toHaveProp("accessibilityLiveRegion", "assertive");
  });

  it("exposes navigation and provider selection state", async () => {
    await render(<InboxScreen />);
    expect(screen.getByRole("tab", { name: "Inbox" })).toBeSelected();

    await fireEvent.press(screen.getByRole("button", { name: "Create a new message" }));
    const provider = screen.getByRole("radio", { name: "Dr. Priya Nair" });
    expect(provider).not.toBeSelected();
    await fireEvent.press(provider);
    expect(provider).toBeSelected();
    expect(provider).toHaveProp("accessibilityHint", "Selects Endocrinology as the message recipient");
  });
});
