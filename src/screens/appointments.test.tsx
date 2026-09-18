import { fireEvent, render, screen } from "@testing-library/react-native";

import AppointmentsScreen from "./appointments";

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/appointments",
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("AppointmentsScreen accessibility", () => {
  it("exposes functional tabs and selected state", async () => {
    await render(<AppointmentsScreen />);

    const upcoming = screen.getByRole("tab", { name: "Upcoming" });
    const past = screen.getByRole("tab", { name: "Past" });
    expect(upcoming).toBeSelected();
    expect(past).not.toBeSelected();

    await fireEvent.press(past);
    expect(past).toBeSelected();
    expect(screen.getByText("No past appointments.")).toBeOnTheScreen();
  });

  it("labels required fields and exposes validation errors as a live alert", async () => {
    await render(<AppointmentsScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Request Appointment" }));

    const provider = screen.getByPlaceholderText("Select a provider");
    expect(provider).toHaveProp("accessible", true);
    expect(provider).toHaveProp("accessibilityLabelledBy", "provider-label");

    await fireEvent.press(screen.getByRole("button", { name: "Submit appointment request" }));
    const alert = screen.getByRole("alert");
    expect(alert).toHaveProp("accessibilityLiveRegion", "assertive");
    expect(provider).toHaveProp("aria-invalid", true);
  });
});
