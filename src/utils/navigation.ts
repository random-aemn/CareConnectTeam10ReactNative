import type { NavItem, ScreenView } from "./theme";

export function getNavState(screen: ScreenView): NavItem {
  if (screen === "medications" || screen === "add") return "Meds";
  return "Home";
}
