import { act, renderHook } from "@testing-library/react-native";

import { useHomeFlow } from "./use-home-flow";

describe("useHomeFlow", () => {
  it("starts on the home screen with Home navigation active", async () => {
    const { result } = await renderHook(() => useHomeFlow());

    expect(result.current.screen).toBe("home");
    expect(result.current.navState).toBe("Home");
  });

  it.each([
    ["highlights", "Home"],
    ["medications", "Meds"],
    ["add", "Meds"],
  ] as const)("maps %s to the %s navigation item", async (screen, navState) => {
    const { result } = await renderHook(() => useHomeFlow());

    await act(async () => {
      result.current.setScreen(screen);
    });

    expect(result.current.screen).toBe(screen);
    expect(result.current.navState).toBe(navState);
  });

  it("returns to Home navigation after leaving the medication flow", async () => {
    const { result } = await renderHook(() => useHomeFlow());

    await act(async () => {
      result.current.setScreen("add");
    });
    await act(async () => {
      result.current.setScreen("home");
    });

    expect(result.current.screen).toBe("home");
    expect(result.current.navState).toBe("Home");
  });
});
