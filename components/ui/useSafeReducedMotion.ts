'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Comme useReducedMotion, mais renvoie false jusqu'au montage :
 * le premier rendu client est identique au rendu serveur (pas d'erreur d'hydratation).
 */
export function useSafeReducedMotion() {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!prefers;
}
