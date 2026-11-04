import type { Tone } from '@/lib/types';
import { Icon, type IconName } from './Icon';
import { toneSoft } from './tones';
import { cn } from './cn';

interface IconBoxProps {
  icon: IconName;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-9 w-9 rounded-[10px] [&>svg]:h-[18px] [&>svg]:w-[18px]',
  md: 'h-12 w-12 rounded-[14px] [&>svg]:h-6 [&>svg]:w-6',
  lg: 'h-16 w-16 rounded-[18px] [&>svg]:h-8 [&>svg]:w-8',
};

export function IconBox({ icon, tone = 'green', size = 'md', className }: IconBoxProps) {
  return (
    <span className={cn('grid flex-none place-items-center', sizes[size], toneSoft[tone], className)}>
      <Icon name={icon} />
    </span>
  );
}
