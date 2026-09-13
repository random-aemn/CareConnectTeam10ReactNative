import { useSyncExternalStore } from 'react';

type WebColorScheme = 'light' | 'dark';

const mediaQuery = '(prefers-color-scheme: dark)';

function getSnapshot(): WebColorScheme {
  return window.matchMedia(mediaQuery).matches ? 'dark' : 'light';
}

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(mediaQuery);
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

export function useColorScheme() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'light');
}
