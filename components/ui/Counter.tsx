'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Durée en secondes */
  duration?: number;
  decimals?: number;
  className?: string;
}

const fmt = (n: number, d: number) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

/** Nombre qui « pousse » de 0 à `value` à l'entrée dans le viewport (format fr-FR). */
export function Counter({ value, prefix = '', suffix = '', duration = 1.8, decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const ctrl = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => ctrl.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {fmt(n, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
