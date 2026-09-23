import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

import AppointmentsScreen from "./appointments";
import HighlightsScreen from "./highlights";
import { Home } from "./home";
import MedicationsScreen from "./medications";

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  Color: { ios: { systemBlue: "#24466F" }, android: { dynamic: { primary: "#24466F" } } },
  usePathname: () => "/",
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

describe("CareConnect user workflow coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the home dashboard summary and navigates to appointments", async () => {
    await render(<Home />);

    expect(screen.getByRole("header", { name: /Good morning/i })).toBeOnTheScreen();
    expect(screen.getByLabelText("3 Appointments")).toBeOnTheScreen();
    expect(screen.getByText("2 appointments in the next 24 hours")).toBeOnTheScreen();
    expect(screen.getByRole("button", { name: "View appointments" })).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole("button", { name: "View appointments" }));
    expect(mockPush).toHaveBeenCalledWith("/appointments");
  });

  it("opens highlights and returns home with accessible navigation hints", async () => {
    await render(<HighlightsScreen />);

    expect(screen.getByRole("header", { name: "Today's Highlights" })).toBeOnTheScreen();
    expect(screen.getByRole("summary", { name: /Lisinopril, 10 mg, scheduled for 8:00 AM, status Missed/i })).toBeOnTheScreen();
    expect(screen.getByRole("summary", { name: /Unread message from Dr. Sarah Chen/i })).toBeOnTheScreen();

    const backButton = screen.getByRole("button", { name: "Back to home" });
    expect(backButton).toHaveProp("accessibilityHint", "Returns to the Home screen");

    await fireEvent.press(backButton);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("lets users switch appointment tabs and validate required form fields", async () => {
    await render(<AppointmentsScreen />);

    const upcoming = screen.getByRole("tab", { name: "Upcoming" });
    const past = screen.getByRole("tab", { name: "Past" });

    expect(upcoming).toBeSelected();
    expect(past).not.toBeSelected();
    expect(screen.getByLabelText("Dr. Sarah Chen, Primary Care, Tue, Sep 1 · 12:20 AM, Northside Medical Center, Suite 210, Approximately 4 hours away")).toBeOnTheScreen();

    await fireEvent.press(past);
    expect(past).toBeSelected();
    expect(screen.getByText("No past appointments.")).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole("button", { name: "Request Appointment" }));
    await fireEvent.press(screen.getByRole("button", { name: "Submit appointment request" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveProp("accessibilityLiveRegion", "assertive");
    expect(alert).toHaveTextContent("Please complete: Medical provider, Preferred date, Start time, End time");
  });

  it("submits an appointment request and announces success to assistive tech", async () => {
    jest.useFakeTimers();
    const announceSpy = jest.spyOn(AccessibilityInfo, "announceForAccessibility").mockImplementation(() => undefined);

    await render(<AppointmentsScreen />);
    await fireEvent.press(screen.getByRole("button", { name: "Request Appointment" }));
    await fireEvent.changeText(screen.getByPlaceholderText("Select a provider"), "Dr. Sarah Chen");
    await fireEvent.changeText(screen.getByPlaceholderText("MM/DD/YYYY"), "09/08/2026");
    await fireEvent.changeText(screen.getByPlaceholderText("9:00 AM"), "9:00 AM");
    await fireEvent.changeText(screen.getByPlaceholderText("10:00 AM"), "10:00 AM");
    await fireEvent.press(screen.getByRole("button", { name: "Submit appointment request" }));

    await act(() => jest.runAllTimers());
    expect(announceSpy).toHaveBeenCalledWith("Appointment request submitted");

    announceSpy.mockRestore();
    jest.useRealTimers();
  });

  it("marks a medication as taken and announces the status change", async () => {
    const announceSpy = jest.spyOn(AccessibilityInfo, "announceForAccessibility").mockImplementation(() => undefined);
    await render(<MedicationsScreen />);

    const markTaken = screen.getByRole("button", { name: "Mark Lisinopril as taken" });
    expect(markTaken).toHaveProp("accessibilityHint", "Updates this medication status to on track");

    await fireEvent.press(markTaken);

    expect(screen.getByRole("summary", { name: /Lisinopril, 10 mg, Once daily · 8:00 AM, prescribed by Doctor Chen, refill Sep 14, 2026, status on track/i })).toBeOnTheScreen();
    expect(announceSpy).toHaveBeenCalledWith("Lisinopril marked as taken");

    announceSpy.mockRestore();
  });
});
