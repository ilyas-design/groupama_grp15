'use client';

import { useReducedMotion } from 'framer-motion';
import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * Comme useReducedMotion, mais renvoie false jusqu'à l'hydratation :
 * le premier rendu client est identique au rendu serveur (pas d'erreur d'hydratation).
 */
export function useSafeReducedMotion() {
  const prefers = useReducedMotion();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return hydrated && !!prefers;
}
