export interface LineRange {
  /** 1-based, inclusive */
  start: number;
  /** 1-based, inclusive */
  end: number;
}

/**
 * Build a Claude-Code-style reference for a file path and optional line ranges.
 *
 * - No ranges (null/empty) → path only: `@path`
 * - Single-line range      → `@path#L12`
 * - Multi-line range       → `@path#L12-L15`
 * - Multiple ranges        → one reference per range, newline-separated
 *
 * The line numbers are taken verbatim; this function does no trimming or
 * normalization (e.g. the "raw end line" decision lives in the caller).
 */
export function buildReference(path: string, ranges: LineRange[] | null): string {
  if (!ranges || ranges.length === 0) {
    return `@${path}`;
  }
  return ranges
    .map((r) =>
      r.start === r.end ? `@${path}#L${r.start}` : `@${path}#L${r.start}-L${r.end}`
    )
    .join('\n');
}
