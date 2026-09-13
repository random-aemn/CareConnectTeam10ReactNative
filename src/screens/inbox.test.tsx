import { fireEvent, render, screen } from "@testing-library/react-native";

import InboxScreen from "./inbox";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/inbox",
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("InboxScreen", () => {
  it("creates a new provider message from the Inbox", async () => {
    await render(<InboxScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Create a new message" }));
    await fireEvent.press(screen.getByRole("radio", { name: "Dr. Priya Nair" }));
    await fireEvent.changeText(screen.getByPlaceholderText("Describe what you need help with"), "I have a question about my medication.");
    await fireEvent.press(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getAllByText("Dr. Priya Nair").length).toBeGreaterThan(0);
    expect(screen.getAllByText("I have a question about my medication.").length).toBeGreaterThan(0);
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

    expect(screen.getByRole("alert")).toHaveTextContent("Choose a provider and enter a message to continue.");
  });
});