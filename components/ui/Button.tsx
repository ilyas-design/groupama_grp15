import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghostLight' | 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-green-700 text-white hover:bg-signature hover:shadow-soft active:translate-y-px',
  secondary: 'bg-white text-ink border border-line hover:border-green-700 hover:text-green-800',
  ghost: 'text-green-800 hover:text-green-900 underline-offset-4 hover:underline !px-1',
  ghostLight: 'text-white hover:text-leaf-lt underline-offset-4 hover:underline !px-1',
  light: 'bg-white text-green-900 hover:bg-leaf-lt',
  dark: 'bg-ink text-white hover:bg-green-900',
};
const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3.5 text-[15px] gap-2.5',
  lg: 'px-7 py-4 text-base gap-3',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: Size;
  /** Icône à droite */
  icon?: IconName;
  iconLeft?: IconName;
  children: ReactNode;
  className?: string;
}

type LinkProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;
type NativeProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;
export type ButtonProps = LinkProps | NativeProps;

/** Bouton, ou lien Next si `href`. Primaire : vert → dégradé signature au survol. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconLeft, children, className } = props;
  const cls = cn(
    'inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} className="h-[18px] w-[18px]" />}
      <span>{children}</span>
      {icon && <Icon name={icon} className="h-[18px] w-[18px]" />}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, icon: _i, iconLeft: _l, children: _c, className: _cl, ...link } = props;
    return (
      <Link {...link} className={cls}>
        {inner}
      </Link>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, icon: _i, iconLeft: _l, children: _c, className: _cl, href: _h, type = 'button', ...btn } = props;
  return (
    <button type={type} {...btn} className={cls}>
      {inner}
    </button>
  );
}
