/**
 * Reads a CSS custom property value from :root as a pixel number.
 * Returns the fallback if the property is not set or not parseable.
 */
export function getCssSpacePx(property: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  const parsed = parseFloat(raw);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Reads a CSS custom property value from :root as a millisecond number.
 * Handles both "300ms" and "0.3s" formats.
 */
export function getCssTimeMs(property: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  if (raw.endsWith('ms')) return parseFloat(raw) || fallback;
  if (raw.endsWith('s')) return (parseFloat(raw) || 0) * 1000 || fallback;
  return fallback;
}
