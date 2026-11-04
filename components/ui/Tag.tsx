import type { ReactNode } from 'react';
import type { Tone } from '@/lib/types';
import { Icon, type IconName } from './Icon';
import { toneSoft } from './tones';
import { cn } from './cn';

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  icon?: IconName;
  className?: string;
}

export function Tag({ children, tone = 'sand', icon, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold', toneSoft[tone], className)}>
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
