/** Concatène des classes en ignorant les valeurs falsy. */
export function cn(...classes: Array<string | number | bigint | boolean | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
