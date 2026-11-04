'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from './cn';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Plusieurs panneaux ouverts en même temps */
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  /** Niveau du titre de chaque entrée */
  headingLevel?: 'h3' | 'h4';
}

/** Accordéon accessible (boutons aria-expanded dans des titres). */
export function Accordion({ items, multiple, defaultOpen = [], className, headingLevel: H = 'h3' }: AccordionProps) {
  const uid = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (id: string) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id]));

  return (
    <div className={cn('divide-y divide-line rounded-card border border-line bg-white', className)}>
      {items.map((it) => {
        const on = open.includes(it.id);
        return (
          <div key={it.id}>
            <H className="m-0">
              <button
                type="button"
                id={`${uid}-h-${it.id}`}
                aria-expanded={on}
                aria-controls={`${uid}-p-${it.id}`}
                onClick={() => toggle(it.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold sm:px-7"
              >
                <span>{it.title}</span>
                <span className={cn('grid h-8 w-8 flex-none place-items-center rounded-full transition-all', on ? 'rotate-180 bg-green-700 text-white' : 'bg-sand-2 text-ink')}>
                  <Icon name="ChevronDown" className="h-4 w-4" />
                </span>
              </button>
            </H>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${uid}-p-${it.id}`}
                  role="region"
                  aria-labelledby={`${uid}-h-${it.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 text-[15px] text-ink-2 sm:px-7">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
