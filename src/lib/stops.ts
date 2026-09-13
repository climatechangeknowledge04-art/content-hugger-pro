/**
 * Motion's scroll transforms require input stops that are inside [0, 1] and
 * never decrease. Rounding at the edges of a segment can break either rule and
 * throws "Offsets must be monotonically non-decreasing", blanking the page.
 * This clamps every stop and forces a non-decreasing sequence.
 */
export function stops(...values: number[]): number[] {
  let prev = 0;
  return values.map((v) => {
    const clamped = Math.min(1, Math.max(0, Number.isFinite(v) ? v : prev));
    prev = Math.max(prev, clamped);
    return prev;
  });
}
