import { getNavState } from "./navigation";

describe("getNavState", () => {
  it.each([
    ["home", "Home"],
    ["highlights", "Home"],
    ["medications", "Meds"],
    ["add", "Meds"],
  ] as const)("maps %s to %s", (screen, expectedNavState) => {
    expect(getNavState(screen)).toBe(expectedNavState);
  });
});
