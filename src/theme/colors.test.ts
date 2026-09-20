import { colors } from "./colors";
import { Colors } from "@/constants/theme";

function luminance(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)!.map((channel) => parseInt(channel, 16) / 255);
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

describe("accessible color tokens", () => {
  it.each([
    ["body text", colors.ink, colors.surface, 4.5],
    ["muted text", colors.muted, colors.surface, 4.5],
    ["primary button text", colors.white, colors.navy, 4.5],
    ["error text", colors.red, colors.surface, 4.5],
    ["success text", colors.green, colors.surface, 4.5],
    ["control boundary", colors.muted, colors.surface, 3],
  ])("keeps %s above its WCAG threshold", (_name, foreground, background, threshold) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(threshold as number);
  });

  it("keeps starter-route links readable in light and dark themes", () => {
    expect(contrast(Colors.light.linkPrimary, Colors.light.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(Colors.dark.linkPrimary, Colors.dark.background)).toBeGreaterThanOrEqual(4.5);
  });
});
