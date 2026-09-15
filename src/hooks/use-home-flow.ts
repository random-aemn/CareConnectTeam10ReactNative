import { useMemo, useState } from "react";

import type { ScreenView } from "../utils/theme";
import { getNavState } from "../utils/navigation";

export function useHomeFlow() {
  const [screen, setScreen] = useState<ScreenView>("home");

  const navState = useMemo(() => getNavState(screen), [screen]);

  return {
    screen,
    navState,
    setScreen,
  };
}
