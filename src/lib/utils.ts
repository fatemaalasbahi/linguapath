/**
 * Merge class names. Utility for Tailwind class composition.
 * clsx/tailwind-merge can be added in later phases if needed.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
