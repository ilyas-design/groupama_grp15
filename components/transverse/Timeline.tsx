'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useSafeReducedMotion } from '@/components/ui/useSafeReducedMotion';
import { useRef } from 'react';
import { IconBox, Tag, cn } from '@/components/ui';
import type { TimelineItem } from '@/content/transverse';

interface TimelineProps {
  items: TimelineItem[];
}

/** Frise verticale : une racine pousse au fil du scroll, chaque repère s'éclaire à son passage. */
export function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative grid gap-10 lg:gap-6">
      {/* Tracé de fond + racine qui pousse */}
      <span aria-hidden className="absolute bottom-0 left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-line lg:left-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : grow, x: '-50%' }}
        className="absolute bottom-0 left-6 top-0 w-[3px] origin-top rounded-full bg-[linear-gradient(180deg,var(--earth),var(--green-500)_55%,var(--water))] lg:left-1/2"
      />

      {items.map((item, i) => {
        const left = i % 2 === 0;
        return (
          <li key={item.title} className="relative pl-16 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">
            <motion.div
              className="absolute left-6 top-1 z-10 lg:left-1/2"
              style={{ x: '-50%' }}
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <IconBox icon={item.icon} tone={item.tone} className="shadow-soft ring-4 ring-sand" />
            </motion.div>

            {/* Radicelle vers la carte (desktop) */}
            <svg
              aria-hidden
              viewBox="0 0 60 30"
              fill="none"
              className={cn('absolute top-4 hidden h-[30px] w-[60px] lg:block', left ? 'right-1/2 mr-6 -scale-x-100' : 'left-1/2 ml-6')}
            >
              <motion.path
                d="M0 10 C20 10 30 22 60 20"
                stroke="var(--earth)"
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </svg>

            <motion.article
              initial={{ opacity: 0, x: reduce ? 0 : left ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'rounded-card border border-line bg-white p-5 shadow-soft sm:p-6',
                left ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2',
              )}
            >
              <Tag tone={item.tone}>{item.period}</Tag>
              <h3 className="mb-2 mt-3 font-serif text-xl font-semibold text-ink sm:text-2xl">{item.title}</h3>
              <p className="text-[15px] text-ink-2">{item.text}</p>
            </motion.article>
          </li>
        );
      })}
    </ol>
  );
}
