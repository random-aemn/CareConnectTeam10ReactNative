import { COLORS } from "./theme";

describe("COLORS", () => {
  it("defines the colors required by the shared UI", () => {
    expect(COLORS).toMatchObject({
      navy: expect.any(String),
      blue: expect.any(String),
      orange: expect.any(String),
      text: expect.any(String),
      muted: expect.any(String),
      white: expect.any(String),
      border: expect.any(String),
    });
  });

  it("uses valid hex colors for solid palette values", () => {
    const hexColors = Object.entries(COLORS)
      .filter(([name]) => name !== "shadow")
      .map(([, value]) => value);

    expect(hexColors).toEqual(
      expect.arrayContaining([expect.stringMatching(/^#[0-9a-f]{6}$/i)]),
    );
    expect(hexColors.every((value) => /^#[0-9a-f]{6}$/i.test(value))).toBe(true);
  });
});
